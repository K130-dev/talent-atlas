import { Sparkles } from 'lucide-react'
import AiSummaryHighlight from './AiSummaryHighlight'
import { AI_EVALUATION_SECTIONS, getEmployeeAiSummaryText } from '../utils/aiEvaluation'

function summaryText(employee) {
  return getEmployeeAiSummaryText(employee)
}

export default function TalentDetail({ employee, semanticHighlightPhrases }) {
  const fromMatchDetails =
    employee.matchDetails?.filter(m => m.matched && m.type === 'semantic').map(m => m.label) || []
  const softHighlightPhrases =
    semanticHighlightPhrases != null ? semanticHighlightPhrases : fromMatchDetails

  const text = summaryText(employee)

  return (
    <div className="flex flex-col h-full">
      {/* Header with Avatar */}
      <div className="px-6 py-5 border-b border-slate-200">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="font-bold text-xl text-slate-700">
              {employee.name.slice(0, 2)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-900 mb-2">{employee.name}</h2>
            <p className="text-sm text-slate-500">{employee.bu_cname}</p>
          </div>
        </div>
      </div>

      {/* AI 综合评价：结构化三项 + 与卡片相同的软匹配高亮 */}
      <div className="flex-1 px-6 py-5 overflow-y-auto">
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-5 border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-semibold text-slate-700">AI 综合评价</h3>
          </div>

          {employee.aiEvaluation ? (
            <div className="space-y-4">
              {AI_EVALUATION_SECTIONS.map(({ key, label }) => (
                <div key={key}>
                  <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {label}
                  </h4>
                  <AiSummaryHighlight
                    text={employee.aiEvaluation[key] || ''}
                    phrases={softHighlightPhrases}
                    className="text-sm text-slate-600"
                    lineClamp={0}
                  />
                </div>
              ))}
            </div>
          ) : text ? (
            <AiSummaryHighlight
              text={text}
              phrases={softHighlightPhrases}
              className="text-sm text-slate-600"
              lineClamp={0}
            />
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">暂无 AI 总结</p>
          )}
        </div>
      </div>
    </div>
  )
}
