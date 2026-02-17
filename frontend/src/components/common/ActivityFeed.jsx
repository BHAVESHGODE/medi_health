import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BiotechIcon from '@mui/icons-material/Biotech';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import PolicyIcon from '@mui/icons-material/Policy';

const iconMap = {
  calendar: <CalendarMonthIcon style={{ fontSize: 16 }} />,
  emergency: <LocalHospitalIcon style={{ fontSize: 16 }} />,
  lab: <BiotechIcon style={{ fontSize: 16 }} />,
  pharmacy: <LocalPharmacyIcon style={{ fontSize: 16 }} />,
  billing: <PaymentIcon style={{ fontSize: 16 }} />,
  patient: <PeopleIcon style={{ fontSize: 16 }} />,
  chat: <ChatIcon style={{ fontSize: 16 }} />,
  insurance: <PolicyIcon style={{ fontSize: 16 }} />,
};

const colorMap = {
  calendar: 'bg-sky-50 text-sky-600',
  emergency: 'bg-rose-50 text-rose-600',
  lab: 'bg-purple-50 text-purple-600',
  pharmacy: 'bg-emerald-50 text-emerald-600',
  billing: 'bg-amber-50 text-amber-600',
  patient: 'bg-primary-50 text-primary-600',
  chat: 'bg-cyan-50 text-cyan-600',
  insurance: 'bg-teal-50 text-teal-600',
};

export default function ActivityFeed({ activities = [], maxItems = 6 }) {
  return (
    <div className="space-y-1">
      {activities.slice(0, maxItems).map((activity, idx) => (
        <div key={activity.id || idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${colorMap[activity.icon] || 'bg-gray-100 text-gray-500'}`}>
            {iconMap[activity.icon] || iconMap.patient}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{activity.message}</p>
            <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
