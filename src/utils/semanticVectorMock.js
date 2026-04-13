/**
 * 模拟「向量检索」返回的近邻词：与 queryParser 中 SEMANTIC_TERMS 对齐。
 * 线上可替换为真实向量服务返回的 top-k 同义词 / 相关短语。
 */

/** @type {Record<string, string[]>} */
export const VECTOR_NEIGHBORS = {
  国际化: ['出海', '多语言', '跨境', '全球', 'Locale', 'i18n', '国家和地区'],
  海外: ['海归', '留学', '外籍', '硅谷', '境外'],
  大客户: ['KA', '企业客户', '千万级', '头部客户'],
  商业化: ['营收', '变现', 'GMV', '收入', 'B 端'],
  架构: ['中台', '系统设计', '技术规划', '中间件'],
  团队管理: ['带团队', '人才培养', '团队氛围', '管理'],
  带团队: ['团队管理', '人才培养', '骨干'],
  算法: ['机器学习', '模型', '策略', '挖掘', '深度学习', 'CTR', 'AB 测试', '基础架构'],
  NLP: ['自然语言', '语义', '文本', '分词', 'LLM', '召回', '智能化'],
  搜索: ['检索', '排序', '召回', '相关性', 'query', 'Query', 'CTR', '长尾', '基础架构'],
  推荐: ['召回', '排序', '个性化', 'Feeds'],
  高并发: ['QPS', '峰值', '瞬时', '大促', '抢购'],
  分布式: ['微服务', '中间件', '容器', '多活', '一致性'],
  微服务: ['服务治理', '容器化', '消息队列', 'RPC'],
  云原生: ['Kubernetes', 'K8s', '容器', 'DevOps', 'FinOps', '多云'],
  数据: ['数据中台', '数据驱动', '指标', '治理', '数仓'],
  增长: ['转化', '留存', '拉新', 'GMV'],
  运营: ['策略', '活动', '指标'],
  用户: ['体验', '满意度', '口碑'],
  体验: ['UX', '体验优化', '交互'],
  产品: ['B 端', '平台化', '需求', '路线图'],
  设计: ['交互', '视觉', '原型'],
  满意: ['满意度', '口碑', 'NPS', '表扬'],
  投诉: ['客诉', '工单', '赔付'],
  服务: ['一线', '客服', '响应'],
  客服: ['一线', '客诉', '满意度', '酒店'],
  硕士: ['研究生', 'Master', '学历'],
  博士: ['PhD', '研究生', '学术'],
  海归: ['海外学历', '留学', '外籍'],
  绩效: ['排名', '考核', 'TOP', '高绩效'],
  高绩效: ['排名前', '优秀', '标杆'],
  晋升: ['晋级', '提拔', '破格'],
  TOP: ['顶尖', '头部', '前列'],
  优秀: ['突出', '标杆', '领先'],
}

/**
 * 合并原词与向量近邻，去重后按长度降序（供高亮长短语优先）
 * @param {string[]} labels 解析得到的软匹配词
 * @returns {string[]}
 */
export function expandSemanticPhrases(labels) {
  const out = new Set()
  for (const label of labels) {
    if (!label || typeof label !== 'string') continue
    const trimmed = label.trim()
    if (!trimmed) continue
    out.add(trimmed)
    const neighbors = VECTOR_NEIGHBORS[trimmed]
    if (neighbors) {
      for (const n of neighbors) {
        if (n) out.add(n)
      }
    }
  }
  return [...out].sort((a, b) => b.length - a.length)
}

/**
 * 摘要是否命中该软匹配词（字面或向量近邻之一）
 */
export function summaryMatchesSemantic(summaryText, canonicalLabel) {
  if (!summaryText || !canonicalLabel) return false
  const s = summaryText
  const lower = s.toLowerCase()
  const hit = (t) => {
    const x = String(t).trim()
    if (!x) return false
    // 纯拉丁/数字类短词（CTR、NLP、K8s、query）走大小写不敏感
    if (/^[a-zA-Z0-9.+\-]+$/.test(x) && x.length <= 12) {
      return lower.includes(x.toLowerCase())
    }
    return s.includes(x)
  }
  if (hit(canonicalLabel)) return true
  const neighbors = VECTOR_NEIGHBORS[String(canonicalLabel).trim()]
  if (!neighbors) return false
  return neighbors.some((n) => hit(n))
}

/**
 * 在摘要中定位短语首次出现区间（与 summaryMatchesSemantic 字面规则一致）
 * @returns {{ start: number, end: number } | null}
 */
function findLiteralSpan(summaryText, phrase) {
  if (!summaryText || !phrase) return null
  const s = summaryText
  const t = String(phrase).trim()
  if (!t) return null
  if (/^[a-zA-Z0-9.+\-]+$/.test(t) && t.length <= 12) {
    const lower = s.toLowerCase()
    const idx = lower.indexOf(t.toLowerCase())
    return idx >= 0 ? { start: idx, end: idx + t.length } : null
  }
  const idx = s.indexOf(t)
  return idx >= 0 ? { start: idx, end: idx + t.length } : null
}

/**
 * 根据已命中的软匹配词，从全文截取「含命中词」的一段话（用于搜索结果卡片，避免展示整篇 AI 总结）
 * @param {string} summaryText getEmployeeAiSummaryText 合并全文
 * @param {string[]} matchedSemanticLabels matchDetails 中 type=semantic 且 matched 的 label 列表
 * @param {{ contextBefore?: number, contextAfter?: number }} [options]
 * @returns {string | null} 无命中词或无法在文中定位时返回 null
 */
export function getSemanticMatchSnippet(summaryText, matchedSemanticLabels, options = {}) {
  const contextBefore = options.contextBefore ?? 52
  const contextAfter = options.contextAfter ?? 100
  if (!summaryText?.trim() || !matchedSemanticLabels?.length) return null

  const phrases = expandSemanticPhrases(matchedSemanticLabels)
  let best = null
  for (const p of phrases) {
    const span = findLiteralSpan(summaryText, p)
    if (!span) continue
    if (!best || span.start < best.start) best = span
  }
  if (!best) return null

  const a = Math.max(0, best.start - contextBefore)
  const b = Math.min(summaryText.length, best.end + contextAfter)
  let slice = summaryText.slice(a, b).trim()
  const prefix = a > 0 ? '…' : ''
  const suffix = b < summaryText.length ? '…' : ''
  return prefix + slice + suffix
}
