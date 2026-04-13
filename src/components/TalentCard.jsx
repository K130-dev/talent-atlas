import { motion } from 'framer-motion'
import { MapPin, Clock, Building2, Sparkles, Lock } from 'lucide-react'
import MatchScore from './MatchScore'
import AiSummaryHighlight from './AiSummaryHighlight'
import { getEmployeeAiSummaryText } from '../utils/aiEvaluation'
import { getSemanticMatchSnippet } from '../utils/semanticVectorMock'

function getAvatarBg(id) {
  const colors = [
    'from-blue-100 to-blue-200',
    'from-violet-100 to-violet-200',
    'from-teal-100 to-teal-200',
    'from-amber-100 to-amber-200',
    'from-pink-100 to-pink-200',
  ]
  return colors[id % colors.length]
}

function extractPeriod(text) {
  const yearMatch = text.match(/(20\d{2})[年H]/)
  if (yearMatch) {
    const year = yearMatch[1]
    const isH2 = text.includes('H2') || text.includes('下半年')
    return `${year}${isH2 ? 'H2' : 'H1'}`
  }
  return null
}

function SoftMatchBlocks({ softMatches }) {
  if (softMatches.length === 0) return null
  return (
    <div className="mt-3 flex items-center gap-2">
      <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-100 text-slate-500 text-xs font-medium shrink-0">
        <Sparkles className="w-3 h-3" />
        软匹配
      </div>
      <div className="flex flex-wrap gap-1.5 min-w-0">
        {softMatches.map((tag, i) => {
          const period = extractPeriod(tag.label)
          return (
            <span
              key={`soft-${i}`}
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100"
            >
              {tag.label}
              {period && (
                <span className="ml-1 px-1 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                  {period}
                </span>
              )}
            </span>
          )
        })}
      </div>
    </div>
  )
}

/** 无权限时下半区：与有权限卡信息结构一致，但不重复事业部/地点/匹配度（已在顶栏露出） */
function MaskedLowerBody({ employee, softMatches, softHighlightPhrases, cardAiSnippet }) {
  return (
    <>
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getAvatarBg(employee.id)} flex items-center justify-center shadow-sm flex-shrink-0`}>
          <span className="font-bold text-sm text-slate-700">
            {employee.name.slice(0, 2)}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-bold text-base text-slate-900">
              {employee.name}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              {employee.tenure}年
            </span>
            <span className="text-slate-500">
              职级 {employee.level}
            </span>
            <span className="text-slate-400 line-clamp-1">
              {employee.pstn_sqnc_name}
            </span>
          </div>
        </div>

        <div className="h-10 w-10 flex-shrink-0" aria-hidden />
      </div>

      <SoftMatchBlocks softMatches={softMatches} />

      {cardAiSnippet ? (
        <div className="mt-2.5">
          <AiSummaryHighlight
            text={cardAiSnippet}
            phrases={softHighlightPhrases}
            className="text-sm text-slate-500"
            lineClamp={6}
          />
        </div>
      ) : null}
    </>
  )
}

export default function TalentCard({ employee, index, onClick, semanticHighlightPhrases }) {
  const matchedTags = employee.matchDetails?.filter(m => m.matched) || []
  const softMatches = matchedTags.filter(t => t.type === 'semantic')
  const fromMatchDetails = softMatches.map(m => m.label)
  /** 优先用当前查询解析出的软匹配词高亮，与顶部「软匹配」标签及解析器一致 */
  const softHighlightPhrases =
    semanticHighlightPhrases != null ? semanticHighlightPhrases : fromMatchDetails
  const matchedSemanticLabels = softMatches.map((m) => m.label)
  const fullAiText = getEmployeeAiSummaryText(employee)
  const cardAiSnippet =
    matchedSemanticLabels.length > 0 ? getSemanticMatchSnippet(fullAiText, matchedSemanticLabels) : null
  const hasPermission = employee.hasPermission !== false

  const handleCardClick = () => {
    if (hasPermission) {
      onClick(employee)
    }
  }

  const handleContactBP = (emp) => {
    const subject =
      emp.hasPermission === false
        ? `联系OTD解锁（工号 ${emp.emp_code}）`
        : `联系OTD关于${emp.name}`
    window.open(`mailto:${emp.bpContact}?subject=${encodeURIComponent(subject)}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`bg-white rounded-xl border border-slate-200/60 relative ${
        hasPermission
          ? 'cursor-pointer overflow-hidden card-base hover:shadow-lg hover:shadow-blue-900/5 hover:border-blue-200'
          : 'overflow-visible'
      }`}
      onClick={hasPermission ? handleCardClick : undefined}
    >
      {hasPermission ? (
        <div className="px-5 py-4">
          <div className="flex items-start gap-4">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getAvatarBg(employee.id)} flex items-center justify-center shadow-sm flex-shrink-0`}>
              <span className="font-bold text-sm text-slate-700">
                {employee.name.slice(0, 2)}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-bold text-base text-slate-900">
                  {employee.name}
                </span>
              </div>

              <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  {employee.bu_cname} · {employee.level}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {employee.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {employee.tenure}年
                </span>
              </div>
            </div>

            <MatchScore score={employee.score} size="sm" />
          </div>

          <SoftMatchBlocks softMatches={softMatches} />

          {cardAiSnippet ? (
            <div className="mt-2.5">
              <AiSummaryHighlight
                text={cardAiSnippet}
                phrases={softHighlightPhrases}
                className="text-sm text-slate-500"
                lineClamp={6}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-3 border-b border-slate-100/90 px-5 pb-3 pt-4">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 shrink-0 text-slate-400" />
                <span className="min-w-0">{employee.bu_cname}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                {employee.location}
              </span>
            </div>
            <div className="flex-shrink-0">
              <MatchScore score={employee.score} size="sm" />
            </div>
          </div>

          <div className="relative select-none rounded-b-xl">
            <div className="px-5 py-4" aria-hidden>
              <MaskedLowerBody
                employee={employee}
                softMatches={softMatches}
                softHighlightPhrases={softHighlightPhrases}
                cardAiSnippet={cardAiSnippet}
              />
            </div>
            <div
              className="pointer-events-auto absolute inset-0 z-[5] mosaic-overlay cursor-default"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-4">
              <button
                type="button"
                className="group relative pointer-events-auto inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl
                  border border-white/70 bg-white/95 text-slate-500 shadow-md shadow-slate-900/10 ring-1 ring-slate-200/80
                  transition-all duration-200 ease-out
                  hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/15
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 focus-visible:ring-offset-2"
                aria-label="联系OTD解锁"
              >
                <Lock className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                <span
                  className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900/95 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg ring-1 ring-white/15 transition-opacity duration-150 group-hover:opacity-100"
                  role="tooltip"
                >
                  联系OTD解锁
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}
