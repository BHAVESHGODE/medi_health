export default function FilterBar({ filters = [], active, onChange, className = '' }) {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            active === filter.value
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-primary-300 hover:text-primary-600'
          }`}
        >
          {filter.label}
          {filter.count !== undefined && (
            <span className={`ml-1.5 text-xs ${active === filter.value ? 'text-white/70' : 'text-gray-400'}`}>
              ({filter.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
