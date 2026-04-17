import { Briefcase, TrendingUp, ThumbsUp, Target } from 'lucide-react'
import AiSummaryHighlight from './AiSummaryHighlight'
import { parseBulletList, parseGrowthTimeline } from '../utils/aiEvaluation'

const SECTION_META = {
  currentResponsibilities: { icon: Briefcase },
  growthHistory: { icon: TrendingUp },
  strengths: { icon: ThumbsUp },
  developmentAreas: { icon: Target },
}

function SectionHeader({ sectionKey, label }) {
  const meta = SECTION_META[sectionKey]
  const Icon = meta?.icon ?? Briefcase
  return (
    <h4 className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-slate-800">
      <Icon className="h-3.5 w-3.5 shrink-0 text-violet-500/85" strokeWidth={2} aria-hidden />
      {label}
    </h4>
  )
}

function GrowthTimelineBlock({ text, phrases }) {
  const items = parseGrowthTimeline(text)
  if (items.length === 0) return null
  return (
    <div className="relative pl-0.5">
      <div className="pointer-events-none absolute left-[5px] top-1.5 bottom-1.5 w-px bg-violet-200/90" aria-hidden />
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="relative flex gap-3 pl-4">
            <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-violet-400 shadow-sm ring-1 ring-violet-200/80" />
            <div className="min-w-0 flex-1">
              {item.yearLabel ? (
                <span className="mb-0.5 block text-[11px] font-semibold tabular-nums text-violet-700/85">
                  {item.yearLabel}
                </span>
              ) : null}
              <AiSummaryHighlight
                text={item.content}
                phrases={phrases}
                className="text-[13px] leading-relaxed text-slate-600"
                lineClamp={0}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function BulletBlock({ text, phrases }) {
  const items = parseBulletList(text)
  return (
    <ul className="space-y-2">
      {items.map((line, i) => (
        <li key={i} className="flex gap-2.5">
          <span
            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400/90"
            aria-hidden
          />
          <AiSummaryHighlight
            text={line}
            phrases={phrases}
            className="min-w-0 flex-1 text-[13px] leading-relaxed text-slate-600"
            lineClamp={0}
          />
        </li>
      ))}
    </ul>
  )
}

/**
 * @param {{ sectionKey: string, label: string, text: string, phrases: string[] }} props
 */
export function AiEvaluationSection({ sectionKey, label, text, phrases }) {
  const body = text?.trim()
  if (!body) return null

  return (
    <section className="py-4">
      <SectionHeader sectionKey={sectionKey} label={label} />
      {sectionKey === 'growthHistory' ? (
        <GrowthTimelineBlock text={body} phrases={phrases} />
      ) : sectionKey === 'strengths' || sectionKey === 'developmentAreas' ? (
        <BulletBlock text={body} phrases={phrases} />
      ) : (
        <AiSummaryHighlight
          text={body}
          phrases={phrases}
          className="text-[13px] leading-relaxed text-slate-600"
          lineClamp={0}
        />
      )}
    </section>
  )
}
