import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Users, Filter, Sparkles } from 'lucide-react'
import { mockEmployees, exampleQueries } from './data/mockData'
import { parseQuery, searchEmployees } from './utils/queryParser'
import { expandSemanticPhrases } from './utils/semanticVectorMock'
import ResultList from './components/ResultList'
import SlideOver from './components/SlideOver'
import TalentDetail from './components/TalentDetail'
import CustomQueryModal from './components/CustomQueryModal'
import AddSemanticKeywordModal from './components/AddSemanticKeywordModal'

const loadingMessages = [
  'Scouting the talent constellations...',
  'Weaving through professional networks...',
  'Discovering hidden gems in the org...',
  'Charting career trajectories...',
  'Connecting the dots of expertise...',
  'Unfolding talent stories...',
  'Navigating the human cloud...',
  'Finding needles in the haystack...',
]

const heroTitles = [
  { main: 'Discover Talent', sub: 'in the Flow' },
  { main: 'Find Your Next', sub: 'Great Hire' },
  { main: 'Navigate the', sub: 'Talent Cosmos' },
  { main: 'Unlock Team', sub: 'Potential' },
  { main: 'Where Talent', sub: 'Meets Opportunity' },
]

const searchPlaceholderMessages = [
  'e.g. 机票事业群，7 级以上，做过国际化项目',
  'e.g. 帮我找个做过国际化项目的机票研发，最好是 P7 以上',
  'e.g. FU技术中心有没有做搜索算法和NLP的同学',
  'e.g. 商旅事业部谁做大客户系统比较厉害的',
  'e.g. 有没有海归硕士，6 级以上的技术同学',
  'e.g. 客服里面哪几个满意度最高的',
]

export default function App() {
  const [query, setQuery] = useState('')
  const [parsedResult, setParsedResult] = useState({ structured: [], semantic: [], rawText: '' })
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0])
  const [heroTitle, setHeroTitle] = useState(() =>
    heroTitles[Math.floor(Math.random() * heroTitles.length)]
  )
  const [searchPlaceholder, setSearchPlaceholder] = useState(() =>
    searchPlaceholderMessages[Math.floor(Math.random() * searchPlaceholderMessages.length)]
  )
  /** 搜索结果：权限内 | 所有员工（含无权限，卡片打码） */
  const [resultScope, setResultScope] = useState('all')
  const [customQueryOpen, setCustomQueryOpen] = useState(false)
  const [semanticKeywordOpen, setSemanticKeywordOpen] = useState(false)

  const searchTimeoutRef = useRef(null)
  const messageIntervalRef = useRef(null)
  const resultsSectionRef = useRef(null)

  // Rotate hero title periodically
  useEffect(() => {
    const titleInterval = setInterval(() => {
      setHeroTitle(prev => {
        const currentIndex = heroTitles.findIndex(t => t.main === prev.main)
        const nextIndex = (currentIndex + 1) % heroTitles.length
        return heroTitles[nextIndex]
      })
    }, 30000)
    return () => clearInterval(titleInterval)
  }, [])

  useEffect(() => {
    if (isSearching) {
      setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
      messageIntervalRef.current = setInterval(() => {
        setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])
      }, 2000)
    } else {
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current)
      }
    }
    return () => {
      if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current)
      }
    }
  }, [isSearching])

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (!query.trim()) {
      setParsedResult({ structured: [], semantic: [], rawText: '' })
      setSearchResults([])
      setHasSearched(false)
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    searchTimeoutRef.current = setTimeout(() => {
      const parsed = parseQuery(query)
      setParsedResult(parsed)
      const results = searchEmployees(mockEmployees, parsed)
      setSearchResults(results)
      setIsSearching(false)
      setHasSearched(true)
    }, 300)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [query])

  /** 有结果后滚动到搜索结果区（避开 sticky 顶栏） */
  useEffect(() => {
    if (!hasSearched || isSearching) return
    const t = window.setTimeout(() => {
      resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
    return () => window.clearTimeout(t)
  }, [hasSearched, isSearching, query])

  const handleClear = useCallback(() => {
    setQuery('')
    setParsedResult({ structured: [], semantic: [], rawText: '' })
    setSearchResults([])
    setHasSearched(false)
  }, [])

  const handleAddSemanticKeyword = useCallback((keyword) => {
    setQuery((prev) => {
      const k = keyword.trim()
      if (!k) return prev
      const base = prev.trim()
      return base ? `${base} ${k}` : k
    })
  }, [])

  const handleExampleClick = useCallback((exampleQuery) => {
    setQuery(exampleQuery.text)
    const parsed = parseQuery(exampleQuery.text)
    setParsedResult(parsed)
    setIsSearching(true)
    setTimeout(() => {
      const results = searchEmployees(mockEmployees, parsed)
      setSearchResults(results)
      setIsSearching(false)
      setHasSearched(true)
    }, 400)
  }, [])

  /** 原词 + 向量近邻（mock），用于卡片/侧栏高亮 */
  const semanticHighlightPhrases = useMemo(
    () => expandSemanticPhrases(parsedResult.semantic.map((s) => s.label)),
    [parsedResult.semantic]
  )

  const displayResults = useMemo(() => {
    if (resultScope === 'all') return searchResults
    return searchResults.filter((e) => e.hasPermission !== false)
  }, [searchResults, resultScope])

  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-x-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#f8fafc] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60"></div>

      {/* Header - Glass effect */}
      <header className="glass border-b border-slate-200/60 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm shadow-blue-500/20">
              <Users className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Talent Atlas</h1>
            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-500 rounded-md border border-slate-200">Internal</span>
          </div>
          <div className="text-sm font-medium text-slate-400">Trip.com Group</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Search Section - Centered */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroTitle.main}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="gradient-text"
                >
                  {heroTitle.main}
                </motion.span>
              </AnimatePresence>
              <br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroTitle.sub}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-slate-900"
                >
                  {heroTitle.sub}
                </motion.span>
              </AnimatePresence>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative flex items-center bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden search-glow transition-all">
              <div className="pl-6 pr-2">
                <Search className="h-6 w-6 text-blue-500" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full py-7 text-lg border-0 shadow-none outline-none bg-transparent placeholder:text-slate-400"
                autoFocus
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="pr-6 pl-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* 硬过滤 / 软匹配：首页入口同一行；有搜索结果时两行，条件标签紧跟对应 icon 后 */}
          <div
            className={`mt-5 flex flex-col px-2 max-w-3xl mx-auto w-full ${
              hasSearched ? 'items-stretch' : 'items-center'
            }`}
          >
            {hasSearched ? (
              <div className="flex w-full max-w-full flex-col items-stretch gap-3">
                <div className="flex w-full max-w-full flex-wrap items-center justify-start gap-x-2 gap-y-1.5">
                  <div className="group relative flex shrink-0 flex-col items-start">
                    <button
                      type="button"
                      onClick={() => setCustomQueryOpen(true)}
                      className="flex items-center gap-2 rounded-lg py-1 text-left transition hover:opacity-90"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1677ff] text-white shadow-sm">
                        <Filter className="h-3.5 w-3.5" strokeWidth={2.25} />
                      </span>
                      <span className="text-xs font-semibold tracking-wide text-[#1677ff]">硬过滤</span>
                    </button>
                    <p
                      className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max max-w-[min(100vw-2rem,18rem)] -translate-x-1/2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-center text-[11px] leading-snug text-slate-700 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
                      role="tooltip"
                    >
                      打开自定义查询，配置结构化条件；解析出的硬过滤条件会展示在图标右侧。
                    </p>
                  </div>
                  {parsedResult.structured.map((tag, i) => (
                    <span
                      key={`struct-${i}`}
                      className="inline-flex items-center rounded border border-[#91caff] bg-[#e6f4ff] px-2 py-0.5 text-[11px] font-medium text-[#0958d9]"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
                <div className="flex w-full max-w-full flex-wrap items-center justify-start gap-x-2 gap-y-1.5">
                  <div className="group relative flex shrink-0 flex-col items-start">
                    <button
                      type="button"
                      onClick={() => setSemanticKeywordOpen(true)}
                      className="flex items-center gap-2 rounded-lg py-1 text-left transition hover:opacity-90"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#fa8c16] text-white shadow-sm">
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={2.25} />
                      </span>
                      <span className="text-xs font-semibold tracking-wide text-[#d46b08]">软匹配</span>
                    </button>
                    <p
                      className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max max-w-[min(100vw-2rem,18rem)] -translate-x-1/2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-center text-[11px] leading-snug text-slate-700 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
                      role="tooltip"
                    >
                      添加软匹配关键词参与语义相关度；也可直接在搜索框中输入自然语言。
                    </p>
                  </div>
                  {parsedResult.semantic.map((tag, i) => (
                    <span
                      key={`sem-${i}`}
                      className="inline-flex items-center rounded border border-[#ffd591] bg-[#fff7e6] px-2 py-0.5 text-[11px] font-medium text-[#d46b08]"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-nowrap items-center justify-center gap-10 sm:gap-14">
                  <div className="group relative flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setCustomQueryOpen(true)}
                      className="flex items-center gap-2 rounded-lg py-1 text-left transition hover:opacity-90"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1677ff] text-white shadow-sm">
                        <Filter className="h-3.5 w-3.5" strokeWidth={2.25} />
                      </span>
                      <span className="text-xs font-semibold tracking-wide text-[#1677ff]">硬过滤</span>
                    </button>
                    <p
                      className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max max-w-[min(100vw-2rem,18rem)] -translate-x-1/2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-center text-[11px] leading-snug text-slate-700 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
                      role="tooltip"
                    >
                      打开自定义查询，配置结构化条件；搜索解析出的结构化条件也会以标签展示在下方。
                    </p>
                  </div>

                  <div className="group relative flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setSemanticKeywordOpen(true)}
                      className="flex items-center gap-2 rounded-lg py-1 text-left transition hover:opacity-90"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#fa8c16] text-white shadow-sm">
                        <Sparkles className="h-3.5 w-3.5" strokeWidth={2.25} />
                      </span>
                      <span className="text-xs font-semibold tracking-wide text-[#d46b08]">软匹配</span>
                    </button>
                    <p
                      className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max max-w-[min(100vw-2rem,18rem)] -translate-x-1/2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-center text-[11px] leading-snug text-slate-700 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
                      role="tooltip"
                    >
                      添加软匹配关键词参与语义相关度；也可直接在搜索框中输入自然语言。
                    </p>
                  </div>
                </div>

                {(parsedResult.structured.length > 0 || parsedResult.semantic.length > 0) && (
                  <div className="mt-4 flex max-w-full flex-wrap justify-center gap-1.5">
                    {parsedResult.structured.map((tag, i) => (
                      <span
                        key={`struct-${i}`}
                        className="inline-flex items-center rounded border border-[#91caff] bg-[#e6f4ff] px-2 py-0.5 text-[11px] font-medium text-[#0958d9]"
                      >
                        {tag.label}
                      </span>
                    ))}
                    {parsedResult.semantic.map((tag, i) => (
                      <span
                        key={`sem-${i}`}
                        className="inline-flex items-center rounded border border-[#ffd591] bg-[#fff7e6] px-2 py-0.5 text-[11px] font-medium text-[#d46b08]"
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin mb-4"></div>
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingMessage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-slate-400 font-medium text-sm"
              >
                {loadingMessage}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Results Section */}
        <AnimatePresence>
          {hasSearched && !isSearching && (
            <motion.div
              ref={resultsSectionRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="scroll-mt-24"
            >
              {/* Results header + 权限范围 */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                    Search Results
                  </span>
                  <div className="h-px flex-1 bg-slate-200 min-w-[2rem]" />
                  <span className="text-sm font-bold text-slate-900 tabular-nums">{displayResults.length}</span>
                  <span className="text-sm text-slate-500 shrink-0">results</span>
                </div>

                <div
                  className="inline-flex rounded-xl border border-blue-100/90 bg-slate-50/90 p-1 shadow-sm self-start sm:self-auto"
                  role="group"
                  aria-label="结果范围"
                >
                  <button
                    type="button"
                    onClick={() => setResultScope('scoped')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      resultScope === 'scoped'
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                        : 'text-slate-600 hover:bg-white hover:text-blue-700'
                    }`}
                  >
                    权限内
                  </button>
                  <button
                    type="button"
                    onClick={() => setResultScope('all')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      resultScope === 'all'
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                        : 'text-slate-600 hover:bg-white hover:text-blue-700'
                    }`}
                  >
                    所有员工
                  </button>
                </div>
              </div>

              {/* Main results */}
              <ResultList
                results={displayResults}
                onSelect={setSelectedEmployee}
                semanticHighlightPhrases={semanticHighlightPhrases}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick examples - only show when not searching */}
        <AnimatePresence>
          {!hasSearched && !isSearching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap justify-center gap-2 mt-4"
            >
              {exampleQueries.slice(0, 3).map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleExampleClick(q)}
                  className="text-sm px-4 py-2 rounded-xl border border-slate-200 text-slate-600
                             hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
                >
                  {q.text}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Employee Detail SlideOver */}
      <SlideOver isOpen={selectedEmployee !== null} onClose={() => setSelectedEmployee(null)}>
        {selectedEmployee && (
          <TalentDetail
            employee={selectedEmployee}
            semanticHighlightPhrases={semanticHighlightPhrases}
          />
        )}
      </SlideOver>

      <CustomQueryModal isOpen={customQueryOpen} onClose={() => setCustomQueryOpen(false)} />
      <AddSemanticKeywordModal
        isOpen={semanticKeywordOpen}
        onClose={() => setSemanticKeywordOpen(false)}
        onAdd={handleAddSemanticKeyword}
      />
    </div>
  )
}
