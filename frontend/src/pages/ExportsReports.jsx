import { useDispatch, useSelector } from 'react-redux';
import { downloadCSV } from '../features/exports/exportSlice';

export default function ExportsReports() {
  const dispatch = useDispatch();
  const { downloading } = useSelector(s => s.exports);

  const click = (ep) => dispatch(downloadCSV(ep));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Exports & Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'Patients CSV', ep: 'patients' },
          { name: 'Appointments CSV', ep: 'appointments' },
          { name: 'Inventory CSV', ep: 'inventory' },
        ].map(x => (
          <button key={x.ep} onClick={() => click(x.ep)} className="p-4 bg-white rounded-xl shadow hover:shadow-md text-left">
            <div className="font-bold">{x.name}</div>
            <div className="text-xs text-gray-500">{downloading ? 'Preparing...' : 'Click to download'}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
