import { motion } from 'framer-motion'

/** 根据分数返回左侧说明文案与强调色（与圆环色系一致） */
function getMatchQuality(score) {
  const s = Number(score) || 0
  if (s >= 90) return { label: '完美匹配', labelClass: 'text-emerald-700' }
  if (s >= 75) return { label: '高度匹配', labelClass: 'text-blue-700' }
  if (s >= 60) return { label: '良好匹配', labelClass: 'text-slate-600' }
  if (s >= 45) return { label: '一般匹配', labelClass: 'text-amber-700' }
  return { label: '弱匹配', labelClass: 'text-orange-700' }
}

export default function MatchScore({ score, size = 'md', showLabel = true }) {
  const sizes = {
    sm: {
      ring: 40,
      stroke: 3,
      fontSize: 'text-xs',
      fontWeight: 'font-bold',
      labelSize: 'text-[10px]',
    },
    md: {
      ring: 52,
      stroke: 3.5,
      fontSize: 'text-sm',
      fontWeight: 'font-bold',
      labelSize: 'text-xs',
    },
  }

  const { ring, stroke, fontSize, fontWeight, labelSize } = sizes[size]
  const radius = (ring - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - score / 100)

  const getColor = (s) => {
    if (s >= 80) return '#10b981'
    if (s >= 60) return '#3b82f6'
    if (s >= 40) return '#f59e0b'
    return '#f97316'
  }

  const color = getColor(score)
  const { label, labelClass } = getMatchQuality(score)

  return (
    <div className="inline-flex items-center gap-1.5">
      {showLabel ? (
        <span
          className={`shrink-0 text-right leading-tight ${labelSize} font-semibold ${labelClass}`}
        >
          {label}
        </span>
      ) : null}
      <div className="relative inline-flex items-center justify-center">
        <svg width={ring} height={ring} className="score-ring-circle">
          <circle
            cx={ring / 2}
            cy={ring / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={ring / 2}
            cy={ring / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span
          className={`absolute ${fontSize} ${fontWeight}`}
          style={{ color }}
        >
          {score}
        </span>
      </div>
    </div>
  )
}
