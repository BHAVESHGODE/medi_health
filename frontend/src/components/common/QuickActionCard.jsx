export default function QuickActionCard({ title, description, icon, onClick, color = 'primary' }) {
  const colorMap = {
    primary: 'bg-primary-50 text-primary-600 group-hover:bg-primary-100',
    emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100',
    amber: 'bg-amber-50 text-amber-600 group-hover:bg-amber-100',
    rose: 'bg-rose-50 text-rose-600 group-hover:bg-rose-100',
    sky: 'bg-sky-50 text-sky-600 group-hover:bg-sky-100',
    purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
  };

  return (
    <button
      onClick={onClick}
      className="glass-panel p-4 card-hover text-left group w-full"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${colorMap[color]}`}>
        {icon}
      </div>
      <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{title}</h3>
      {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
    </button>
  );
}
