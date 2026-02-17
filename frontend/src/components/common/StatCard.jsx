import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function StatCard({ title, value, subtitle, icon, trend, trendValue, color = 'primary', className = '' }) {
  const colorMap = {
    primary: 'from-primary-500 to-primary-700',
    emerald: 'from-emerald-500 to-teal-600',
    amber: 'from-amber-400 to-orange-500',
    rose: 'from-rose-400 to-rose-600',
    sky: 'from-sky-400 to-blue-600',
    purple: 'from-purple-500 to-indigo-600',
  };

  const bgLightMap = {
    primary: 'bg-primary-50',
    emerald: 'bg-emerald-50',
    amber: 'bg-amber-50',
    rose: 'bg-rose-50',
    sky: 'bg-sky-50',
    purple: 'bg-purple-50',
  };

  const textMap = {
    primary: 'text-primary-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    rose: 'text-rose-600',
    sky: 'text-sky-600',
    purple: 'text-purple-600',
  };

  return (
    <div className={`glass-panel p-5 animate-fade-in ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white animate-count-up">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${trend === 'up' ? 'text-emerald-600' : 'text-rose-500'}`}>
              {trend === 'up' ? <TrendingUpIcon style={{ fontSize: 14 }} /> : <TrendingDownIcon style={{ fontSize: 14 }} />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`w-11 h-11 rounded-xl ${bgLightMap[color]} ${textMap[color]} flex items-center justify-center`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
