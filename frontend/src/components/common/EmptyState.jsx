import InboxIcon from '@mui/icons-material/Inbox';

export default function EmptyState({ title = 'No data found', subtitle = 'There are no records to display at this time.', icon, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 text-gray-400">
        {icon || <InboxIcon style={{ fontSize: 32 }} />}
      </div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">{title}</h3>
      <p className="text-sm text-gray-400 max-w-sm mb-6">{subtitle}</p>
      {action && action}
    </div>
  );
}
