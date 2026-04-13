import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, X, ChevronRight, Minus, Plus } from 'lucide-react'

const CATEGORIES = [
  { id: 'company', label: '在司经历' },
  { id: 'edu', label: '教育背景' },
  { id: 'work', label: '工作经历' },
  { id: 'entry', label: '入职定岗' },
  { id: 'mgmt', label: '管理经验' },
  { id: 'eval', label: '评价考核' },
  { id: 'ability', label: '能力' },
  { id: 'culture', label: '文化&培训' },
  { id: 'personality', label: '个性标签' },
  { id: 'tags', label: '综合标签' },
]

const FIELD_TREE = [
  {
    id: 'basic',
    label: '基本信息',
    children: [
      { id: 'seq', label: '当前序列' },
      { id: 'level', label: '当前级别' },
      { id: 'func', label: '当前职能' },
      { id: 'tenure', label: '本司司龄（年）' },
    ],
  },
  { id: 'transfer', label: '转岗经历', children: [] },
  { id: 'dispatch', label: '派遣经历', children: [] },
  { id: 'dispatch_will', label: '派遣意愿', children: [] },
  { id: 'product', label: '产品标签', children: [] },
]

/** 企业后台风：自定义查询（右侧滑出抽屉） */
export default function CustomQueryModal({ isOpen, onClose }) {
  const [activeCat, setActiveCat] = useState('company')
  const [expanded, setExpanded] = useState({ basic: true })
  const [selectedField, setSelectedField] = useState('level')
  const [groups, setGroups] = useState([{ id: 1, fields: [] }])

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const expandAll = () => {
    const next = {}
    FIELD_TREE.forEach((n) => {
      next[n.id] = true
    })
    setExpanded(next)
  }

  const collapseAll = () => {
    setExpanded({})
  }

  const reset = () => {
    setActiveCat('company')
    setExpanded({ basic: true })
    setSelectedField('level')
    setGroups([{ id: 1, fields: [] }])
  }

  const addGroup = () => {
    setGroups((g) => [...g, { id: Date.now(), fields: [] }])
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
            className="fixed inset-0 z-[100] bg-black/35"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed right-0 top-0 z-[101] flex h-full w-[min(100vw,1120px)] flex-col border-l border-[#d9d9d9] bg-[#f0f2f5] shadow-[-8px_0_24px_rgba(0,0,0,0.08)]"
          >
            {/* 顶栏 */}
            <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#d9d9d9] bg-white px-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-2 text-[#262626]">
                <FileText className="h-5 w-5 shrink-0 text-[#1677ff]" strokeWidth={1.75} />
                <h1 className="truncate text-base font-medium">自定义查询</h1>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={reset}
                  className="hidden h-8 items-center rounded border border-[#d9d9d9] bg-white px-2 text-xs text-[#595959] hover:border-[#1677ff] hover:text-[#1677ff] sm:inline-flex sm:px-3 sm:text-sm"
                >
                  还原
                </button>
                <button
                  type="button"
                  className="hidden h-8 items-center rounded border border-[#d9d9d9] bg-white px-2 text-xs text-[#595959] hover:border-[#1677ff] hover:text-[#1677ff] sm:inline-flex sm:px-3 sm:text-sm"
                >
                  保存为标签
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-8 rounded bg-[#1677ff] px-3 text-xs font-medium text-white hover:bg-[#4096ff] sm:px-4 sm:text-sm"
                >
                  查询
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-0.5 flex h-8 w-8 items-center justify-center rounded text-[#8c8c8c] hover:bg-[#f5f5f5] hover:text-[#262626]"
                  aria-label="关闭"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div className="flex min-h-0 flex-1 gap-px overflow-hidden bg-[#d9d9d9]">
              {/* 左：分类 */}
              <aside className="w-44 shrink-0 overflow-y-auto bg-white sm:w-52">
                <nav className="py-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setActiveCat(c.id)}
                      className={`relative flex w-full items-center px-3 py-2.5 text-left text-sm sm:px-4 ${
                        activeCat === c.id
                          ? 'bg-[#e6f4ff] text-[#1677ff] after:absolute after:right-0 after:top-0 after:h-full after:w-0.5 after:bg-[#1677ff]'
                          : 'text-[#595959] hover:bg-[#fafafa]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </nav>
              </aside>

              {/* 中：字段树 */}
              <section className="min-w-0 flex-1 overflow-y-auto bg-white">
                <div className="border-b border-[#f0f0f0] px-3 py-3 sm:px-4">
                  <p className="text-xs text-[#8c8c8c]">点击 + 将条件项添加到右侧条件组</p>
                  <div className="mt-2 flex gap-4 text-xs">
                    <button type="button" onClick={expandAll} className="text-[#1677ff] hover:underline">
                      展开全部
                    </button>
                    <button type="button" onClick={collapseAll} className="text-[#1677ff] hover:underline">
                      收起全部
                    </button>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  {FIELD_TREE.map((node) => {
                    const isExp = expanded[node.id]
                    const hasChildren = node.children?.length > 0
                    return (
                      <div key={node.id} className="mb-1">
                        <div className="flex items-center gap-1 text-sm">
                          {hasChildren ? (
                            <button
                              type="button"
                              onClick={() => toggleExpand(node.id)}
                              className="flex h-6 w-6 items-center justify-center text-[#8c8c8c]"
                            >
                              {isExp ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                            </button>
                          ) : (
                            <span className="w-6" />
                          )}
                          <span className="text-[#262626]">{node.label}</span>
                        </div>
                        {hasChildren && isExp && (
                          <div className="ml-7 mt-1 space-y-0.5 border-l border-[#f0f0f0] pl-3">
                            {node.children.map((child) => (
                              <div key={child.id} className="flex items-center justify-between gap-2 py-1">
                                <button
                                  type="button"
                                  onClick={() => setSelectedField(child.id)}
                                  className={`text-left text-sm ${
                                    selectedField === child.id ? 'font-medium text-[#1677ff]' : 'text-[#595959] hover:text-[#1677ff]'
                                  }`}
                                >
                                  {child.label}
                                </button>
                                <button
                                  type="button"
                                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[#d9d9d9] text-[#1677ff] hover:border-[#1677ff]"
                                  title="添加到条件组"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* 右：条件组 */}
              <section className="w-[min(38vw,380px)] shrink-0 overflow-y-auto border-l border-[#f0f0f0] bg-white">
                <div className="p-3 sm:p-4">
                  {groups.map((g, idx) => (
                    <div key={g.id} className="mb-4">
                      <div className="mb-2 flex items-center gap-1 text-sm font-medium text-[#262626]">
                        <ChevronRight className="h-4 w-4 text-[#8c8c8c]" />
                        条件组{idx + 1}
                      </div>
                      <div className="min-h-[100px] rounded border border-[#d9d9d9] bg-[#fafafa] p-3 sm:min-h-[120px]">
                        {g.fields.length === 0 && (
                          <p className="pt-6 text-center text-xs text-[#bfbfbf] sm:pt-8">从左侧添加条件字段</p>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addGroup}
                    className="flex w-full items-center justify-center gap-1 rounded border border-dashed border-[#d9d9d9] bg-white py-2.5 text-sm text-[#8c8c8c] hover:border-[#1677ff] hover:text-[#1677ff]"
                  >
                    <Plus className="h-4 w-4" />
                    添加条件组
                  </button>
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
