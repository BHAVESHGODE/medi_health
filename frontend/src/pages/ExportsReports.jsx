import { useDispatch, useSelector } from 'react-redux';
import { downloadCSV } from '../features/exports/exportSlice';
import PageHeader from '../components/common/PageHeader';
import GetAppIcon from '@mui/icons-material/GetApp';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InventoryIcon from '@mui/icons-material/Inventory';

export default function ExportsReports() {
  const dispatch = useDispatch();
  const { downloading } = useSelector(s => s.exports);

  const reports = [
    { name: 'Patients CSV', ep: 'patients', icon: <PeopleIcon style={{ fontSize: 24 }} />, description: 'Export all patient records' },
    { name: 'Appointments CSV', ep: 'appointments', icon: <CalendarMonthIcon style={{ fontSize: 24 }} />, description: 'Export appointment data' },
    { name: 'Inventory CSV', ep: 'inventory', icon: <InventoryIcon style={{ fontSize: 24 }} />, description: 'Export pharmacy inventory' },
  ];

  return (
    <div>
      <PageHeader
        title="Exports & Reports"
        subtitle="Download data in CSV format"
        icon={<GetAppIcon style={{ fontSize: 22 }} />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reports.map(x => (
          <button 
            key={x.ep} 
            onClick={() => dispatch(downloadCSV(x.ep))} 
            className="glass-panel p-6 text-left hover:shadow-card-hover transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {x.icon}
            </div>
            <div className="font-bold text-gray-900 dark:text-white mb-1">{x.name}</div>
            <div className="text-xs text-gray-500">{downloading ? 'Preparing...' : x.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
