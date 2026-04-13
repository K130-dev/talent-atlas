/**
 * AI 综合评价结构化字段：主要工作 / 优势 / 劣势
 * 合并全文用于语义检索与列表卡片；详情页分块展示
 */
export function getEmployeeAiSummaryText(emp) {
  if (emp?.aiEvaluation) {
    const { mainWork, strengths, weaknesses } = emp.aiEvaluation
    return [mainWork, strengths, weaknesses].filter(Boolean).join('\n\n')
  }
  if (typeof emp?.aiSummary === 'string' && emp.aiSummary.trim()) {
    return emp.aiSummary
  }
  return typeof emp?.projects === 'string' ? emp.projects.split('\n')[0] || '' : ''
}

export const AI_EVALUATION_SECTIONS = [
  { key: 'mainWork', label: '主要工作' },
  { key: 'strengths', label: '优势' },
  { key: 'weaknesses', label: '劣势' },
]
