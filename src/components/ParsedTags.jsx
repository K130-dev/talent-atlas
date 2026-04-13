import { motion } from 'framer-motion'
import { Layers, Building2, Code2, GraduationCap, MapPin, UserPlus, Sparkles } from 'lucide-react'

const iconMap = {
  layers: Layers,
  'building-2': Building2,
  'code-2': Code2,
  'graduation-cap': GraduationCap,
  'map-pin': MapPin,
  'user-plus': UserPlus,
  sparkles: Sparkles,
}

const typeConfig = {
  level: {
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
  },
  bu: {
    borderColor: 'border-violet-200',
    textColor: 'text-violet-700',
    bgColor: 'bg-violet-50',
  },
  pstn_sqnc: {
    borderColor: 'border-teal-200',
    textColor: 'text-teal-700',
    bgColor: 'bg-teal-50',
  },
  edctn: {
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
  },
  location: {
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
  },
  source: {
    borderColor: 'border-pink-200',
    textColor: 'text-pink-700',
    bgColor: 'bg-pink-50',
  },
  semantic: {
    borderColor: 'border-slate-200',
    textColor: 'text-slate-600',
    bgColor: 'bg-slate-100',
  },
}

function Tag({ tag, index }) {
  const config = typeConfig[tag.type] || typeConfig.semantic
  const Icon = iconMap[tag.icon] || Sparkles

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
        delay: index * 0.04,
      }}
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium
        border ${config.borderColor} ${config.bgColor} ${config.textColor}
      `}
    >
      <Icon className="w-3 h-3 flex-shrink-0" />
      <span>{tag.label}</span>
    </motion.div>
  )
}

export default function ParsedTags({ structured, semantic }) {
  const allTags = [...structured, ...semantic]
  if (!allTags.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {allTags.map((tag, i) => (
        <Tag key={`${tag.type}-${i}`} tag={tag} index={i} />
      ))}
    </div>
  )
}
