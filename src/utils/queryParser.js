/**
 * Query Parser - 解析自然语言查询
 * 基于企业真实字段：级别、事业部(BU)、职务序列、学历、地点等
 */

import { summaryMatchesSemantic } from './semanticVectorMock.js'
import { getEmployeeAiSummaryText } from './aiEvaluation.js'

const LEVEL_PATTERNS = [
  // 7以上、8以上、7级以上 等 → 最小级别
  { pattern: /([1-8])(?:\s*以上|\s*\+|级|级以[\s上]?)/i, type: 'level_min', label: (m) => `≥${m[1]}级` },
  // 7级、8级 → 精确级别
  { pattern: /([1-8])(?:\s*级)?/i, type: 'level', label: (m) => `${m[1]}级` },
  // AVP+ 以上
  { pattern: /AVP\+(?:\s*以上|\s*\+)?/i, type: 'level_min', label: '>8级', level_value: 9 },
  // AVP+ 精确
  { pattern: /AVP\+/i, type: 'level', label: 'AVP+', level_value: 9 },
]

const BU_PATTERNS = [
  { pattern: /机票/i, type: 'bu', value: 'BG-机票事业群', label: '机票事业群' },
  { pattern: /住宿|(酒店|民宿)/i, type: 'bu', value: 'BG-大住宿事业群', label: '大住宿事业群' },
  { pattern: /旅游|度假/i, type: 'bu', value: 'BG-旅游事业群', label: '旅游事业群' },
  { pattern: /火车票|(火车|铁道)/i, type: 'bu', value: 'BG-火车票事业群', label: '火车票事业群' },
  { pattern: /商旅|企业差旅/i, type: 'bu', value: 'MBU-商旅事业部', label: '商旅事业部' },
  { pattern: /金融|支付/i, type: 'bu', value: 'MBU-金融事业部', label: '金融事业部' },
  { pattern: /技术中心|(基础架构|平台)/i, type: 'bu', value: 'FU-技术中心', label: '技术中心' },
  { pattern: /市场营销|(市场|品牌)/i, type: 'bu', value: 'FU-市场营销部', label: '市场营销部' },
  { pattern: /内容|内容中心/i, type: 'bu', value: 'FU-内容中心', label: '内容中心' },
  { pattern: /HR|人力|人力资源/i, type: 'bu', value: 'FU-人力资源部', label: '人力资源部' },
]

const PSTN_SQNC_PATTERNS = [
  { pattern: /技术|研发|开发|后端|前端/i, type: 'pstn_sqnc', value: 'T', label: '技术序列' },
  { pattern: /产品|PM/i, type: 'pstn_sqnc', value: 'PT', label: '产品序列' },
  { pattern: /客服|一线/i, type: 'pstn_sqnc', value: 'S', label: '客服序列' },
  { pattern: /职能|行政|财务|法务/i, type: 'pstn_sqnc', value: 'P', label: '职能序列' },
]

const EDCTN_PATTERNS = [
  { pattern: /博士|PhD/i, type: 'edctn', value: '博士', label: '博士' },
  { pattern: /硕士|Master|研究生/i, type: 'edctn', value: '硕士', label: '硕士' },
  { pattern: /本科|学士|大学/i, type: 'edctn', value: '本科', label: '本科' },
  { pattern: /大专|专科/i, type: 'edctn', value: '大专', label: '大专' },
]

const LOCATION_PATTERNS = [
  { pattern: /上海/i, type: 'location', value: '上海', label: '上海' },
  { pattern: /北京/i, type: 'location', value: '北京', label: '北京' },
  { pattern: /深圳/i, type: 'location', value: '深圳', label: '深圳' },
  { pattern: /杭州/i, type: 'location', value: '杭州', label: '杭州' },
  { pattern: /广州/i, type: 'location', value: '广州', label: '广州' },
]

const SOURCE_PATTERNS = [
  { pattern: /校招|校园招聘/i, type: 'source', value: '校招', label: '校招' },
  { pattern: /社招|社会招聘/i, type: 'source', value: '社招', label: '社招' },
]

const SEMANTIC_TERMS = [
  '国际化', '海外', '大客户', '商业化', '架构', '团队管理', '带团队',
  '算法', 'NLP', '搜索', '推荐', '高并发', '分布式', '微服务', '云原生',
  '数据', '增长', '运营', '用户', '体验', '产品', '设计',
  '满意', '投诉', '服务', '客服',
  '硕士', '博士', '海外', '海归',
  '绩效', '高绩效', '晋升', 'TOP', '优秀',
]

/** 允许保留的二字词（否则易被口语碎片污染） */
const SEMANTIC_TWO_CHAR_ALLOW = new Set(
  SEMANTIC_TERMS.filter((t) => t.length === 2)
)

/** 精确匹配的口语/问句碎片，不作为软匹配 */
const SEMANTIC_JUNK_EXACT = new Set([
  '那边', '有没有', '有没有做', '那边有没有', '那边有没有做',
  '的同学', '同学', '想', '一下', '了解', '了解一下', '想了解一下',
  '想了解下', '问问', '问问看', '想问问', '看下', '看看',
  '吗', '呢', '啊', '嘛', '吧', '哦',
  '请', '帮', '我', '你', '他', '她', '做个', '做个看',
  '什么样的', '之类', '等等', '以及', '或者', '还是',
  '什么', '怎么', '如何', '为啥', '为什么',
  '这个', '那个', '哪个', '谁', '哪', '哪边', '哪儿',
  '要', '能', '会', '可以', '应该', '希望', '帮忙', '帮助',
  '找个', '找', '查', '看', '做', '想',
  '大住宿', // 常为 BU 命中后的残留
  '住宿那边', '那边做',
  // 求助/条件句式碎片
  '帮我', '帮我找', '帮我找个', '找个', '做过', '帮我找个做过',
  '项目的', '最好是', '最好', '左右', '大概',
  '比较', '比较厉害的', '厉害', '想', '需要', '想要',
  '谁', '哪位', '哪几位', '几个', '一些',
])

/**
 * 过滤问句、语气词等无检索价值的软匹配片段
 */
function isSemanticJunk(term) {
  const t = String(term).trim()
  if (t.length < 2) return true
  if (t.length > 18) return true // 未分词的长串，避免整句当软匹配
  if (SEMANTIC_JUNK_EXACT.has(t)) return true
  // 典型口语串
  if (/那边有没有/.test(t)) return true
  if (/的同学$/.test(t) && t.length <= 6) return true
  if (/^想(一)?下$/.test(t)) return true
  if (/了解一下$/.test(t)) return true
  if (/^[想做查找个请帮我一下的吗呢啊嘛吧哦]+$/u.test(t) && t.length <= 5) return true
  // 「帮我…找 / 做过 / 最好是」类求助句
  if (/^帮我/.test(t)) return true
  if (/找个/.test(t) && t.length <= 8) return true
  if (/做过/.test(t) && t.length <= 10) return true
  if (/^最好是|^最好/.test(t)) return true
  if (/的?项目[的得]?$/.test(t) && t.length <= 5) return true
  return false
}

function filterSemanticTerms(terms) {
  const out = []
  const seen = new Set()
  for (const raw of terms) {
    const t = String(raw).trim()
    if (isSemanticJunk(t)) continue
    if (t.length === 2 && !SEMANTIC_TWO_CHAR_ALLOW.has(t)) continue
    if (seen.has(t)) continue
    seen.add(t)
    out.push(t)
  }
  return out
}

/**
 * 解析自然语言查询
 */
export function parseQuery(query) {
  if (!query || !query.trim()) {
    return { structured: [], semantic: [], rawText: '' }
  }

  const structured = []
  const semanticTerms = []
  let remainingText = query
  let tagIndex = 0

  // 解析级别
  for (const item of LEVEL_PATTERNS) {
    const match = remainingText.match(item.pattern)
    if (match) {
      let levelVal = item.level_value || (match[1] ? parseInt(match[1]) : null)
      if (levelVal === null) continue
      structured.push({
        type: 'level',
        label: item.label(match),
        value: item.type === 'level_min' ? { min: levelVal } : { value: levelVal },
        icon: 'layers',
        index: tagIndex++,
      })
      remainingText = remainingText.replace(match[0], ' ')
    }
  }

  // 解析 BU
  for (const { pattern, type, value, label } of BU_PATTERNS) {
    const match = remainingText.match(pattern)
    if (match) {
      structured.push({
        type: 'bu',
        label,
        value,
        icon: 'building-2',
        index: tagIndex++,
      })
      remainingText = remainingText.replace(match[0], ' ')
    }
  }

  // 解析职务序列
  for (const { pattern, type, value, label } of PSTN_SQNC_PATTERNS) {
    const match = remainingText.match(pattern)
    if (match) {
      structured.push({
        type: 'pstn_sqnc',
        label,
        value,
        icon: 'code-2',
        index: tagIndex++,
      })
      remainingText = remainingText.replace(match[0], ' ')
    }
  }

  // 解析学历
  for (const { pattern, type, value, label } of EDCTN_PATTERNS) {
    const match = remainingText.match(pattern)
    if (match) {
      structured.push({
        type: 'edctn',
        label,
        value,
        icon: 'graduation-cap',
        index: tagIndex++,
      })
      remainingText = remainingText.replace(match[0], ' ')
    }
  }

  // 解析地点
  for (const { pattern, type, value, label } of LOCATION_PATTERNS) {
    const match = remainingText.match(pattern)
    if (match) {
      structured.push({
        type: 'location',
        label,
        value,
        icon: 'map-pin',
        index: tagIndex++,
      })
      remainingText = remainingText.replace(match[0], ' ')
    }
  }

  // 解析来源
  for (const { pattern, type, value, label } of SOURCE_PATTERNS) {
    const match = remainingText.match(pattern)
    if (match) {
      structured.push({
        type: 'source',
        label,
        value,
        icon: 'user-plus',
        index: tagIndex++,
      })
      remainingText = remainingText.replace(match[0], ' ')
    }
  }

  // 语义关键词匹配
  for (const term of SEMANTIC_TERMS) {
    const regex = new RegExp(term)
    if (remainingText.match(regex)) {
      semanticTerms.push(term)
      remainingText = remainingText.replace(regex, ' ')
    }
  }

  // 软匹配词仅来自语义词表命中，不把「剩余中文按空格拆段」塞进标签（否则会混入「帮我找个做过」等口语碎片）

  const semanticFiltered = filterSemanticTerms(semanticTerms)

  const semantic = semanticFiltered.map((term, i) => ({
    type: 'semantic',
    label: term,
    value: term,
    icon: 'sparkles',
    index: tagIndex + i,
  }))

  return {
    structured,
    semantic,
    rawText: query,
  }
}

/**
 * 搜索员工
 */
export function searchEmployees(employees, parsed) {
  if (!parsed.structured.length && !parsed.semantic.length) {
    return []
  }

  return employees
    .map(emp => {
      const matchDetails = []
      let structuredScore = 0
      let semanticScore = 0
      /** 解析出的结构化条件（BU/职级/地点等）需全部满足，否则视为未命中整条查询 */
      let allStructuredMatched = true

      // 结构化条件匹配
      for (const condition of parsed.structured) {
        let matched = false

        switch (condition.type) {
          case 'level': {
            if (condition.value.min) {
              matched = emp.level_value >= condition.value.min
            } else {
              matched = emp.level_value === condition.value.value || emp.level_value === condition.value.min
            }
            break
          }
          case 'bu':
            matched = emp.bu_cname.includes(condition.value) || emp.bu_name.includes(condition.value)
            break
          case 'pstn_sqnc':
            matched = emp.pstn_sqnc === condition.value || emp.pstn_sqnc_name.includes(condition.value)
            break
          case 'edctn':
            matched = emp.edctn_dgre === condition.value
            break
          case 'location':
            matched = emp.location === condition.value
            break
          case 'source':
            matched = emp.source.includes(condition.value)
            break
        }

        matchDetails.push({
          type: condition.type,
          label: condition.label,
          matched,
        })

        if (!matched) {
          allStructuredMatched = false
        }
        if (matched) {
          structuredScore += 35
        }
      }

      // 语义匹配：以 AI 综合评价全文（主要工作/优势/劣势合并）为语料，与软匹配词嵌合
      const semanticCount = parsed.semantic.length
      const semanticWeight = semanticCount > 0 ? 60 / semanticCount : 0
      const summaryText = getEmployeeAiSummaryText(emp)

      for (const term of parsed.semantic) {
        let found = false
        if (summaryText && summaryMatchesSemantic(summaryText, term.value)) {
          found = true
        }
        matchDetails.push({
          type: 'semantic',
          label: term.label,
          matched: found,
        })
        if (found) {
          semanticScore += semanticWeight
        }
      }

      const rawScore = Math.min(100, Math.round(structuredScore + semanticScore))
      const score =
        parsed.structured.length > 0 && !allStructuredMatched ? 0 : rawScore

      return {
        ...emp,
        score,
        structuredScore: Math.min(100, structuredScore * 2.5),
        semanticScore: Math.min(100, semanticScore * 1.67),
        matchDetails,
      }
    })
    .filter(emp => emp.score > 0)
    .sort((a, b) => b.score - a.score)
}
