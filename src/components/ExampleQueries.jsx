import { motion } from 'framer-motion'
import { Globe, Search, Briefcase, GraduationCap, Star } from 'lucide-react'

const iconMap = {
  globe: Globe,
  search: Search,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  star: Star,
}

export default function ExampleQueries({ examples, onSelect }) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
        Example Queries
      </div>
      {examples.map((example, i) => {
        const Icon = iconMap[example.icon] || Search
        return (
          <motion.button
            key={example.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelect(example)}
            className="
              w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium
              text-slate-500 bg-transparent
              border border-transparent
              hover:border-slate-200 hover:text-slate-700 hover:bg-slate-50
              transition-all duration-150
            "
          >
            <div className="flex items-start gap-2">
              <Icon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-400" />
              <span className="leading-snug">{example.text}</span>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
