import TalentCard from './TalentCard'

export default function ResultList({ results, onSelect, semanticHighlightPhrases }) {
  if (!results.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <div className="font-semibold text-slate-900 mb-1.5">
          No matches found
        </div>
        <p className="text-sm text-slate-500">
          Try adjusting your search criteria or using different keywords.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {results.map((employee, index) => (
        <TalentCard
          key={employee.id}
          employee={employee}
          index={index}
          onClick={() => onSelect(employee)}
          semanticHighlightPhrases={semanticHighlightPhrases}
        />
      ))}
    </div>
  )
}
