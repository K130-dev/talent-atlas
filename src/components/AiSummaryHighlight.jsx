import { splitTextByPhrases } from '../utils/highlightText'

/**
 * 展示 AI 总结，并对与当前查询软匹配且命中的片段做高亮（嵌合在总结原文中）
 */
export default function AiSummaryHighlight({ text, phrases, className, lineClamp = 2 }) {
  const parts = splitTextByPhrases(text, phrases)
  const clampClass =
    lineClamp === 1
      ? 'line-clamp-1'
      : lineClamp === 2
        ? 'line-clamp-2'
        : lineClamp === 3
          ? 'line-clamp-3'
          : lineClamp === 4
            ? 'line-clamp-4'
            : lineClamp === 5
              ? 'line-clamp-5'
              : lineClamp === 6
                ? 'line-clamp-6'
                : ''

  const multiline = text.includes('\n')

  return (
    <p
      className={`leading-relaxed ${multiline ? 'whitespace-pre-line' : ''} ${clampClass} ${className ?? ''}`}
    >
      {parts.map((part, i) =>
        part.highlight ? (
          <mark
            key={i}
            className="rounded bg-amber-200/95 px-0.5 font-medium text-amber-950 [box-decoration-break:clone]"
          >
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </p>
  )
}
