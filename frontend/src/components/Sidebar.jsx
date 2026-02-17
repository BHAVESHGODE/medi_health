import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { motion as Motion } from 'framer-motion';

// Actually I installed @mui/icons-material, let's use that to be safe with installed deps
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArticleIcon from '@mui/icons-material/Article';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ChatIcon from '@mui/icons-material/Chat';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BiotechIcon from '@mui/icons-material/Biotech';
import PolicyIcon from '@mui/icons-material/Policy';

function Sidebar({ darkMode, toggleTheme }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    const menuItems = [
        { name: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { name: 'Patients', icon: <PeopleIcon />, path: '/patients', roles: ['admin', 'doctor', 'receptionist'] },
        { name: 'Appointments', icon: <CalendarMonthIcon />, path: '/appointments' },
        { name: 'Records', icon: <ArticleIcon />, path: '/records', roles: ['doctor', 'patient'] },
        { name: 'Billing', icon: <PaymentIcon />, path: '/billing', roles: ['admin', 'receptionist'] },
        { name: 'Emergencies', icon: <LocalHospitalIcon />, path: '/emergency', roles: ['admin', 'doctor', 'nurse'] },
        { name: 'Pharmacy', icon: <LocalPharmacyIcon />, path: '/pharmacy', roles: ['admin', 'pharmacist'] },
        { name: 'Chat', icon: <ChatIcon />, path: '/chat' },
        { name: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics', roles: ['admin'] },
        { name: 'Lab', icon: <BiotechIcon />, path: '/lab', roles: ['admin', 'doctor'] },
        { name: 'Insurance', icon: <PolicyIcon />, path: '/insurance', roles: ['admin', 'receptionist'] },
        // { name: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    ];

    // Filter menu items based on role
    const filteredItems = menuItems.filter(item => !item.roles || item.roles.includes(user?.role));

    return (
        <Motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            className="w-64 h-screen glass-panel m-4 fixed left-0 top-0 flex flex-col justify-between z-50 text-gray-700"
        >
            <div>
                <div className="flex items-center gap-2 p-6 border-b border-gray-200 border-opacity-30">
                    <LocalHospitalIcon className="text-primary" fontSize="large" />
                    <h1 className="text-2xl font-bold text-primary">MediHealth</h1>
                </div>

                <nav className="mt-8 px-4 flex flex-col gap-2">
                    {filteredItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all group"
                        >
                            <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-200 border-opacity-30">
                <div className="flex items-center justify-between mb-4 px-4">
                    <span className="text-sm font-bold dark:text-gray-300">Dark Mode</span>
                    <button
                        onClick={toggleTheme}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${darkMode ? 'bg-primary' : 'bg-gray-300'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>

                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold dark:text-gray-200">{user?.name}</span>
                        <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                    <LogoutIcon />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </Motion.div>
    );
}

export default Sidebar;
