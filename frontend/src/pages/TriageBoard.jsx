import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { SOCKET_URL } from '../config';
import { fetchBoard, updateRealtime } from '../features/triage/triageSlice';

const socket = io(SOCKET_URL);

export default function TriageBoard() {
  const dispatch = useDispatch();
  const { cases, isLoading } = useSelector(s => s.triage);

  useEffect(() => {
    dispatch(fetchBoard());
    socket.on('triage:update', (data) => dispatch(updateRealtime(data)));
    return () => socket.off('triage:update');
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Real-time Triage Board</h1>
      {isLoading ? <div>Loading...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map(c => (
            <div key={c._id} className={`p-4 rounded-xl shadow bg-white border-l-4 ${c.triage?.priority === 'critical' ? 'border-red-500' : c.triage?.priority === 'urgent' ? 'border-orange-500' : 'border-green-500'}`}>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Case #{c._id.slice(-6)}</span>
                <span className="text-xs uppercase">{c.status}</span>
              </div>
              <div className="text-sm">Priority: <span className="font-bold capitalize">{c.triage?.priority || 'N/A'}</span></div>
              <div className="text-sm">Score: {c.triage?.score ?? 'N/A'}</div>
              <div className="text-xs text-gray-500 mt-2">Updated: {c.updatedAt ? new Date(c.updatedAt).toLocaleString() : ''}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
