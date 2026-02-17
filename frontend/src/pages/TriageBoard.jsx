import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { SOCKET_URL } from '../config';
import { fetchBoard, updateRealtime } from '../features/triage/triageSlice';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';

const socket = io(SOCKET_URL);

export default function TriageBoard() {
  const dispatch = useDispatch();
  const { cases, isLoading } = useSelector(s => s.triage);

  useEffect(() => {
    dispatch(fetchBoard());
    socket.on('triage:update', (data) => dispatch(updateRealtime(data)));
    return () => socket.off('triage:update');
  }, [dispatch]);

  const getPriorityColor = (priority) => {
    if (priority === 'critical') return 'border-red-500 bg-red-50 dark:bg-red-900/20';
    if (priority === 'urgent') return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
    return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
  };

  return (
    <div>
      <PageHeader
        title="Triage Board"
        subtitle="Real-time patient triage management"
        icon={<CrisisAlertIcon style={{ fontSize: 22 }} />}
      />
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : cases.length === 0 ? (
        <EmptyState 
          title="No triage cases" 
          subtitle="Triage cases will appear here" 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map(c => (
            <div 
              key={c._id} 
              className={`glass-panel p-5 border-l-4 ${getPriorityColor(c.triage?.priority)}`}
              style={{ 
                borderColor: c.triage?.priority === 'critical' ? '#EF4444' : c.triage?.priority === 'urgent' ? '#F97316' : '#10B981' 
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-gray-900 dark:text-white">Case #{c._id?.slice(-6) || 'N/A'}</span>
                <span className="text-xs uppercase font-medium px-2 py-1 bg-white dark:bg-gray-700 rounded-full text-gray-500">
                  {c.status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Priority:</span>
                  <span className={`font-bold capitalize ${
                    c.triage?.priority === 'critical' ? 'text-red-600' : 
                    c.triage?.priority === 'urgent' ? 'text-orange-600' : 'text-emerald-600'
                  }`}>
                    {c.triage?.priority || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Score:</span>
                  <span className="font-semibold">{c.triage?.score ?? 'N/A'}</span>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                Updated: {c.updatedAt ? new Date(c.updatedAt).toLocaleString() : 'N/A'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
