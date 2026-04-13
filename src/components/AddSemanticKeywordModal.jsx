import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

/** 追加软匹配关键词到搜索框 */
export default function AddSemanticKeywordModal({ isOpen, onClose, onAdd }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setValue('')
      const t = window.setTimeout(() => inputRef.current?.focus(), 100)
      return () => window.clearTimeout(t)
    }
  }, [isOpen])

  const submit = () => {
    const v = value.trim()
    if (!v) return
    onAdd(v)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/35"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            className="fixed left-1/2 top-[22%] z-[95] w-[min(100%,400px)] -translate-x-1/2 rounded-lg border border-[#d9d9d9] bg-white shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-[#f0f0f0] px-4 py-3">
              <h2 className="text-sm font-medium text-[#262626]">添加软匹配关键词</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded p-1 text-[#8c8c8c] hover:bg-[#f5f5f5] hover:text-[#262626]"
                aria-label="关闭"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <label className="mb-1.5 block text-xs text-[#8c8c8c]">关键词将追加到搜索框，参与语义相关度</label>
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                placeholder="例如：云原生、团队管理"
                className="h-9 w-full rounded border border-[#d9d9d9] px-3 text-sm text-[#262626] outline-none ring-[#1677ff] placeholder:text-[#bfbfbf] focus:border-[#1677ff] focus:ring-1"
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-8 rounded border border-[#d9d9d9] bg-white px-3 text-sm text-[#595959] hover:border-[#1677ff] hover:text-[#1677ff]"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={submit}
                  className="h-8 rounded bg-[#1677ff] px-4 text-sm font-medium text-white hover:bg-[#4096ff]"
                >
                  添加
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
