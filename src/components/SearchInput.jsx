import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, X, Loader2 } from 'lucide-react'

export default function SearchInput({ value, onChange, onSearch, onClear, isSearching }) {
  const inputRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !isSearching && value.trim()) onSearch?.()
      if (e.key === 'Escape') {
        onClear?.()
        inputRef.current?.blur()
      }
    }
    inputRef.current?.addEventListener('keydown', handleKeyDown)
    return () => inputRef.current?.removeEventListener('keydown', handleKeyDown)
  }, [onSearch, onClear, isSearching, value])

  return (
    <div className="relative flex items-center gap-2">
      <Search className="w-4 h-4 text-slate-400 flex-shrink-0 ml-3" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="输入自然语言，如：机票事业群 7 级以上，做过国际化项目"
        className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400
                   outline-none py-3"
        autoFocus
      />

      {isSearching ? (
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-3">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="flex items-center gap-2 mr-2">
          {value && (
            <button
              onClick={onClear}
              className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {value.trim() && (
            <button
              onClick={onSearch}
              className="px-3 py-1 rounded text-xs font-medium
                         bg-blue-500 text-white
                         hover:bg-blue-600 transition-colors"
            >
              搜索
            </button>
          )}
        </div>
      )}
    </div>
  )
}
