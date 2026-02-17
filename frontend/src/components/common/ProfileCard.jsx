import StatusBadge from './StatusBadge';
import StarIcon from '@mui/icons-material/Star';

export default function ProfileCard({ name, role, subtitle, avatar, status, rating, onClick, className = '' }) {
  return (
    <div onClick={onClick} className={`glass-panel p-5 card-hover ${className}`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
          {avatar || name?.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">{name}</h3>
            {status && <StatusBadge status={status} />}
          </div>
          <p className="text-sm text-gray-500 truncate">{role}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {rating && (
          <div className="flex items-center gap-1 text-amber-500">
            <StarIcon style={{ fontSize: 16 }} />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        )}
      </div>
    </div>
  );
}
