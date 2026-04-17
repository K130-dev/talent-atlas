import { motion } from 'framer-motion'
import { RotateCcw, Share2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const W = 440
/** 较矮的画布，侧栏里少占纵向空间，多留给 Talent Card */
const H = 280
const NEBULA_HUES = [258, 189, 330]

const MIN_SCALE = 0.45
const MAX_SCALE = 3.8

/** @param {React.RefObject<SVGSVGElement | null>} svgRef */
function clientToSvg(svgRef, clientX, clientY) {
  const el = svgRef.current
  if (!el) return { x: W / 2, y: H / 2 }
  const rect = el.getBoundingClientRect()
  const x = ((clientX - rect.left) / rect.width) * W
  const y = ((clientY - rect.top) / rect.height) * H
  return { x, y }
}

function layoutGraph(network, seed) {
  const cx = W / 2
  const cy = H / 2 + 6
  const n = Math.max(network.length, 1)

  const nodes = network.map((node, i) => {
    const jitter = (((seed + i * 29) % 100) / 1000) * 1.4 - 0.07
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2 + jitter
    const r = 82 + ((seed * 11 + i * 19) % 32) * 0.55
    const x = cx + Math.cos(angle) * r
    const y = cy + Math.sin(angle) * r
    const hue = NEBULA_HUES[i % NEBULA_HUES.length]
    const major = i % 4 === 0 || (node.weight ?? 50) > 75
    const nodeR = major ? 8 : 5.5
    return { ...node, x, y, hue, nodeR, angle, major }
  })

  const satEdges = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const d = Math.hypot(dx, dy)
      if (d < 118 && d > 28 && (i + j + seed) % 3 === 0) {
        satEdges.push({ a: nodes[i], b: nodes[j], hue: nodes[i].hue })
      }
    }
  }
  if (satEdges.length > 6) satEdges.splice(6)

  return { cx, cy, nodes, satEdges }
}

function labelOffset(node, cx, cy) {
  const dx = node.x - cx
  const dy = node.y - cy
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  return {
    tx: node.x + ux * 20,
    ty: node.y + uy * 18,
  }
}

/**
 * @param {{ network: object[], centerName: string, seed?: number }} props
 */
export default function WorkNetwork({ network, centerName, seed = 0 }) {
  const graph = useMemo(() => layoutGraph(network, seed), [network, seed])

  const svgRef = useRef(null)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const dragRef = useRef({ active: false, pid: 0 })

  const resetView = useCallback(() => {
    setPan({ x: 0, y: 0 })
    setScale(1)
  }, [])

  const onWheel = useCallback((e) => {
    e.preventDefault()
    const { x: mx, y: my } = clientToSvg(svgRef, e.clientX, e.clientY)
    const factor = e.deltaY > 0 ? 0.9 : 1.1
    const hx = W / 2
    const hy = H / 2
    setScale((kPrev) => {
      const kNext = Math.min(MAX_SCALE, Math.max(MIN_SCALE, kPrev * factor))
      if (kNext === kPrev) return kPrev
      setPan((pPrev) => ({
        x: mx - hx - (kNext / kPrev) * (mx - pPrev.x - hx),
        y: my - hy - (kNext / kPrev) * (my - pPrev.y - hy),
      }))
      return kNext
    })
  }, [])

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onWheel])

  useEffect(() => {
    setPan({ x: 0, y: 0 })
    setScale(1)
  }, [seed])

  const onPointerDown = useCallback((e) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { active: true, pid: e.pointerId }
  }, [])

  const onPointerMove = useCallback((e) => {
    if (!dragRef.current.active || e.pointerId !== dragRef.current.pid) return
    const el = svgRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.movementX / rect.width) * W
    const dy = (e.movementY / rect.height) * H
    setPan((p) => ({ x: p.x + dx, y: p.y + dy }))
  }, [])

  const onPointerUp = useCallback((e) => {
    if (e.pointerId !== dragRef.current.pid) return
    dragRef.current.active = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }, [])

  const gTransform = `translate(${pan.x}, ${pan.y}) translate(${W / 2}, ${H / 2}) scale(${scale}) translate(${-W / 2}, ${-H / 2})`

  if (!network?.length) return null

  const uid = `wn-${seed}`

  return (
    <div className="relative mt-3 shrink-0 overflow-hidden rounded-lg border border-violet-100/80 bg-gradient-to-b from-violet-50/45 to-indigo-50/25">
      <div className="relative z-[1] flex flex-wrap items-center justify-between gap-2 border-b border-violet-100/70 bg-white/70 px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <Share2 className="h-4 w-4 shrink-0 text-violet-600/90" strokeWidth={2} aria-hidden />
          <div>
            <h3 className="text-sm font-semibold text-slate-800">工作网络</h3>
            <p className="text-[10px] text-violet-600/75">滚轮缩放 · 拖拽平移</p>
          </div>
        </div>
        <button
          type="button"
          onClick={resetView}
          className="flex shrink-0 items-center gap-1 rounded-md border border-violet-200/80 bg-white/90 px-2 py-1 text-[11px] font-medium text-violet-700 shadow-sm transition hover:bg-violet-50"
          title="复位视图"
        >
          <RotateCcw className="h-3 w-3" strokeWidth={2.2} aria-hidden />
          复位
        </button>
      </div>

      <motion.div
        className="relative z-[1] w-full px-1.5 pb-2"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="mx-auto block h-auto w-full max-h-[220px] max-w-[min(100%,400px)] cursor-grab touch-none select-none active:cursor-grabbing"
          style={{ touchAction: 'none' }}
          role="img"
          aria-label={`${centerName} 的工作网络，可滚轮缩放、拖拽平移`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <defs>
            <radialGradient id={`${uid}-hub`} cx="35%" cy="30%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#5b21b6" />
            </radialGradient>
          </defs>

          <g transform={gTransform}>
            {/* 卫星间弱连接 */}
            {graph.satEdges.map((e, i) => (
              <line
                key={`sat-${i}`}
                x1={e.a.x}
                y1={e.a.y}
                x2={e.b.x}
                y2={e.b.y}
                stroke="rgba(129, 140, 248, 0.28)"
                strokeWidth={0.85 / scale}
              />
            ))}

            {/* 中心 → 卫星 */}
            {graph.nodes.map((node) => (
              <line
                key={`hub-${node.id}`}
                x1={graph.cx}
                y1={graph.cy}
                x2={node.x}
                y2={node.y}
                stroke="rgba(99, 102, 241, 0.32)"
                strokeWidth={1 / scale}
                opacity={0.92}
              />
            ))}

            {/* 卫星节点 */}
            {graph.nodes.map((node) => {
              const fill = node.major ? '#6366f1' : '#a5b4fc'
              return (
                <circle
                  key={`g-${node.id}`}
                  cx={node.x}
                  cy={node.y}
                  r={node.nodeR}
                  fill={fill}
                  stroke="#fff"
                  strokeWidth={1.2 / scale}
                />
              )
            })}

            <circle
              cx={graph.cx}
              cy={graph.cy}
              r={16}
              fill={`url(#${uid}-hub)`}
              stroke="#fff"
              strokeWidth={1.5 / scale}
            />

            {graph.nodes.map((node) => {
              const { tx, ty } = labelOffset(node, graph.cx, graph.cy)
              return (
                <text
                  key={`t-${node.id}`}
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#0f172a"
                  style={{
                    fontSize: node.major ? 12 : 11,
                    fontWeight: node.major ? 650 : 500,
                    letterSpacing: '0.02em',
                  }}
                >
                  {node.name}
                </text>
              )
            })}

            <text
              x={graph.cx}
              y={graph.cy + 5}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.06em',
              }}
            >
              {centerName.slice(0, 2)}
            </text>
          </g>
        </svg>
      </motion.div>
    </div>
  )
}
