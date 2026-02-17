import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { SOCKET_URL } from '../config';
import { fetchNotifications, markRead } from '../features/notifications/notificationSlice';
import { addRealtime } from '../features/notifications/notificationSlice';

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {isLoading ? <div>Loading...</div> : (
        <div className="space-y-2">
          {items.map(n => (
            <div key={n._id} className={`p-4 rounded-xl shadow bg-white flex items-start justify-between ${n.read ? 'opacity-70' : ''}`}>
              <div>
                <div className="font-bold">{n.title}</div>
                <div className="text-sm text-gray-600">{n.message}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
              </div>
              {!n.read && (
                <button onClick={() => dispatch(markRead(n._id))} className="btn-primary px-3 py-1 rounded-lg">Mark read</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
