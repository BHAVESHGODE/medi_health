import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { SOCKET_URL } from '../config';
import { fetchNotifications, markRead } from '../features/notifications/notificationSlice';
import { addRealtime } from '../features/notifications/notificationSlice';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const socket = io(SOCKET_URL);

export default function NotificationsCenter() {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector(s => s.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
    socket.on('notification:new', (n) => dispatch(addRealtime(n)));
    return () => socket.off('notification:new');
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="View and manage your notifications"
        icon={<NotificationsIcon style={{ fontSize: 22 }} />}
      />
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : items.length === 0 ? (
        <EmptyState 
          title="No notifications" 
          subtitle="You're all caught up!" 
        />
      ) : (
        <div className="space-y-3">
          {items.map(n => (
            <div 
              key={n._id} 
              className={`glass-panel p-5 flex items-start justify-between transition-all ${n.read ? 'opacity-60' : ''}`}
            >
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">{n.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{n.message}</div>
                <div className="text-xs text-gray-400 mt-2">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
              {!n.read && (
                <button 
                  onClick={() => dispatch(markRead(n._id))} 
                  className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium px-3 py-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <CheckCircleIcon style={{ fontSize: 16 }} />
                  Mark read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
