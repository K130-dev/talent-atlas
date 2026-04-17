import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function SlideOver({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-[2px]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex h-full min-h-0 w-full max-w-2xl flex-col border-l border-violet-100/80 bg-gradient-to-b from-white via-slate-50/90 to-violet-50/35 shadow-[-12px_0_40px_-8px_rgba(99,102,241,0.12)]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[60] flex h-8 w-8 items-center justify-center rounded-full text-violet-400 transition-colors hover:bg-violet-50 hover:text-violet-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
