/**
 * AI Talent Card 结构化字段：当前职责 / 成长经历 / 优势项 / 待发展项
 * 合并全文用于语义检索与列表卡片；详情页分块展示
 */
export function getEmployeeAiSummaryText(emp) {
  if (emp?.aiEvaluation) {
    const ev = emp.aiEvaluation
    if (
      ev.currentResponsibilities != null ||
      ev.growthHistory != null ||
      ev.developmentAreas != null
    ) {
      const { currentResponsibilities, growthHistory, strengths, developmentAreas } = ev
      return [currentResponsibilities, growthHistory, strengths, developmentAreas]
        .filter(Boolean)
        .join('\n\n')
    }
    const { mainWork, strengths, weaknesses } = ev
    return [mainWork, strengths, weaknesses].filter(Boolean).join('\n\n')
  }
  if (typeof emp?.aiSummary === 'string' && emp.aiSummary.trim()) {
    return emp.aiSummary
  }
  return typeof emp?.projects === 'string' ? emp.projects.split('\n')[0] || '' : ''
}

/** @type {{ key: string, label: string }[]} */
export const AI_EVALUATION_SECTIONS = [
  { key: 'currentResponsibilities', label: '当前职责' },
  { key: 'growthHistory', label: '成长经历' },
  { key: 'strengths', label: '优势项' },
  { key: 'developmentAreas', label: '待发展项' },
]

/**
 * 将优势/待发展等段落拆成列表项（优先按中文分号、换行，再按句号）
 * @param {string} text
 * @returns {string[]}
 */
export function parseBulletList(text) {
  if (!text?.trim()) return []
  const t = text.trim()
  let parts = t.split(/[；;\n\r]+/).map((s) => s.trim()).filter(Boolean)
  if (parts.length <= 1) {
    parts = t.split(/(?<=[。！？])\s+/).map((s) => s.trim()).filter(Boolean)
  }
  if (parts.length === 0) return [t]
  return parts
}

/**
 * 成长经历拆成时间线节点（按句读切分，并尝试提取句首年份作标签）
 * @param {string} text
 * @returns {{ yearLabel: string | null, content: string }[]}
 */
export function parseGrowthTimeline(text) {
  if (!text?.trim()) return []
  const t = text.trim()
  let chunks = t.split(/(?<=[。！？])\s+/).map((s) => s.trim()).filter(Boolean)
  if (chunks.length <= 1) {
    chunks = t.split(/[；;]/).map((s) => s.trim()).filter(Boolean)
  }
  if (chunks.length === 0) chunks = [t]
  return chunks.map((chunk) => {
    const ym = chunk.match(/(20\d{2})\s*年?/)
    return {
      yearLabel: ym ? ym[1] : null,
      content: chunk,
    }
  })
}
