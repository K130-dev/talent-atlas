/**
 * 按短语拆分文本（长短语优先），用于 AI 总结中与软匹配词嵌合高亮
 */
export function splitTextByPhrases(text, phrases) {
  const s = text == null ? '' : String(text)
  if (!s) return []
  const sorted = [...new Set((phrases || []).filter(Boolean))].sort((a, b) => b.length - a.length)
  if (!sorted.length) return [{ text: s, highlight: false }]

  const escaped = sorted.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const re = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = []
  let last = 0
  let m
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) {
      parts.push({ text: s.slice(last, m.index), highlight: false })
    }
    parts.push({ text: m[0], highlight: true })
    last = m.index + m[0].length
  }
  if (last < s.length) {
    parts.push({ text: s.slice(last), highlight: false })
  }
  return parts.length ? parts : [{ text: s, highlight: false }]
}
