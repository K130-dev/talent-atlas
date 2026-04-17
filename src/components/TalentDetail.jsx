import { Sparkles } from 'lucide-react'
import AiSummaryHighlight from './AiSummaryHighlight'
import { AiEvaluationSection } from './AiTalentPresentation'
import WorkNetwork from './WorkNetwork'
import { AI_EVALUATION_SECTIONS, getEmployeeAiSummaryText } from '../utils/aiEvaluation'
import { buildWorkNetwork } from '../utils/workNetwork'

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
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Header with Avatar */}
      <div className="shrink-0 border-b border-violet-100/90 bg-white/50 px-6 py-5">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 via-violet-50 to-violet-100 shadow-sm ring-1 ring-violet-200/40">
            <span className="text-xl font-bold text-indigo-950/90">
              {employee.name.slice(0, 2)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-slate-900 mb-2">{employee.name}</h2>
            <p className="text-sm text-slate-500">{employee.bu_cname}</p>
          </div>
        </div>
      </div>

      {/* AI Talent Card（占满头像与工作网络之间剩余高度，内容区内部滚动）+ 工作网络 */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-6 py-4">
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-violet-100/70 bg-white/90 shadow-sm shadow-indigo-950/[0.04] ring-1 ring-violet-100/60">
          <div className="relative shrink-0 border-b border-violet-100/80 bg-gradient-to-r from-violet-50/50 to-indigo-50/40 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 shrink-0 text-violet-600" strokeWidth={2} aria-hidden />
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-slate-800">AI Talent Card</h3>
                <p className="text-[11px] text-violet-600/70">下方为工作网络</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4">
            {employee.aiEvaluation ? (
              <div className="divide-y divide-violet-100/90">
                {AI_EVALUATION_SECTIONS.map(({ key, label }) => (
                  <AiEvaluationSection
                    key={key}
                    sectionKey={key}
                    label={label}
                    text={employee.aiEvaluation[key] || ''}
                    phrases={softHighlightPhrases}
                  />
                ))}
              </div>
            ) : text ? (
              <div className="py-4">
                <AiSummaryHighlight
                  text={text}
                  phrases={softHighlightPhrases}
                  className="text-[13px] leading-relaxed text-slate-600"
                  lineClamp={0}
                />
              </div>
            ) : (
              <p className="py-8 text-center text-xs text-slate-500">暂无 AI 总结</p>
            )}
          </div>
        </div>

        <div className="shrink-0">
          <WorkNetwork
            network={buildWorkNetwork(employee)}
            centerName={employee.name}
            seed={employee.id ?? 0}
          />
        </div>
      </div>
    </div>
  )
}
