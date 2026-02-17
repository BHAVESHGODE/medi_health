import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ChatIcon from '@mui/icons-material/Chat';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BiotechIcon from '@mui/icons-material/Biotech';
import PolicyIcon from '@mui/icons-material/Policy';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import GetAppIcon from '@mui/icons-material/GetApp';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BadgeIcon from '@mui/icons-material/Badge';
import HotelIcon from '@mui/icons-material/Hotel';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HistoryIcon from '@mui/icons-material/History';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CloseIcon from '@mui/icons-material/Close';

function Sidebar({ darkMode, toggleTheme, isOpen, onClose }) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    const mainMenu = [
        { name: 'Dashboard', icon: <DashboardIcon style={{ fontSize: 20 }} />, path: '/' },
        { name: 'Patients', icon: <PeopleIcon style={{ fontSize: 20 }} />, path: '/patients', roles: ['admin', 'doctor', 'receptionist'] },
        { name: 'Appointments', icon: <CalendarMonthIcon style={{ fontSize: 20 }} />, path: '/appointments' },
        { name: 'Emergencies', icon: <LocalHospitalIcon style={{ fontSize: 20 }} />, path: '/emergency', roles: ['admin', 'doctor', 'nurse'], badge: 3 },
        { name: 'Triage Board', icon: <CrisisAlertIcon style={{ fontSize: 20 }} />, path: '/triage', roles: ['admin', 'doctor', 'nurse'] },
    ];

    const clinicalMenu = [
        { name: 'Pharmacy', icon: <LocalPharmacyIcon style={{ fontSize: 20 }} />, path: '/pharmacy', roles: ['admin', 'pharmacist'] },
        { name: 'Laboratory', icon: <BiotechIcon style={{ fontSize: 20 }} />, path: '/lab', roles: ['admin', 'doctor'] },
        { name: 'Radiology', icon: <ImageSearchIcon style={{ fontSize: 20 }} />, path: '/radiology', roles: ['admin', 'doctor'] },
        { name: 'Blood Bank', icon: <BloodtypeIcon style={{ fontSize: 20 }} />, path: '/blood-bank', roles: ['admin', 'doctor', 'nurse'] },
    ];

    const adminMenu = [
        { name: 'Departments', icon: <ApartmentIcon style={{ fontSize: 20 }} />, path: '/departments' },
        { name: 'Staff Directory', icon: <BadgeIcon style={{ fontSize: 20 }} />, path: '/staff' },
        { name: 'Bed Management', icon: <HotelIcon style={{ fontSize: 20 }} />, path: '/beds', roles: ['admin', 'nurse'] },
        { name: 'Billing', icon: <PaymentIcon style={{ fontSize: 20 }} />, path: '/billing', roles: ['admin', 'receptionist'] },
        { name: 'Insurance', icon: <PolicyIcon style={{ fontSize: 20 }} />, path: '/insurance', roles: ['admin', 'receptionist'] },
        { name: 'Analytics', icon: <AnalyticsIcon style={{ fontSize: 20 }} />, path: '/analytics', roles: ['admin'] },
    ];

    const toolsMenu = [
        { name: 'Chat', icon: <ChatIcon style={{ fontSize: 20 }} />, path: '/chat', badge: 2 },
        { name: 'Notifications', icon: <NotificationsIcon style={{ fontSize: 20 }} />, path: '/notifications', badge: 5 },
        { name: 'Search', icon: <SearchIcon style={{ fontSize: 20 }} />, path: '/search' },
        { name: 'Exports', icon: <GetAppIcon style={{ fontSize: 20 }} />, path: '/exports', roles: ['admin', 'receptionist'] },
        { name: 'Audit Log', icon: <HistoryIcon style={{ fontSize: 20 }} />, path: '/audit-log', roles: ['admin'] },
        { name: 'Feedback', icon: <FeedbackIcon style={{ fontSize: 20 }} />, path: '/feedback' },
    ];

    const bottomMenu = [
        { name: 'Settings', icon: <SettingsIcon style={{ fontSize: 20 }} />, path: '/settings' },
        { name: 'Help Center', icon: <HelpOutlineIcon style={{ fontSize: 20 }} />, path: '/help' },
    ];

    const filterItems = (items) => items.filter(item => !item.roles || item.roles.includes(user?.role));

    const renderSection = (title, items) => {
        const filtered = filterItems(items);
        if (filtered.length === 0) return null;
        return (
            <div className="mb-2">
                {title && (
                    <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        {title}
                    </p>
                )}
                {filtered.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={onClose}
                            className={`group flex items-center gap-3 mx-2 mb-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                                isActive
                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/40 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-600 dark:bg-primary-500 rounded-r-full" />
                            )}
                            <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                                {item.icon}
                            </span>
                            <span className="flex-1">{item.name}</span>
                            {item.badge && (
                                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
            )}

            <aside className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col z-50 transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                {/* Logo */}
                <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center shadow-lg shadow-primary-500/25">
                            <LocalHospitalIcon style={{ fontSize: 20 }} />
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">MediHealth</span>
                    </div>
                    <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors">
                        <CloseIcon style={{ fontSize: 20 }} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-2">
                    {renderSection('Overview', mainMenu)}
                    {renderSection('Clinical', clinicalMenu)}
                    {renderSection('Administration', adminMenu)}
                    {renderSection('Tools', toolsMenu)}
                </nav>

                {/* Bottom section */}
                <div className="border-t border-gray-100 dark:border-gray-700/50 p-3 space-y-1">
                    {renderSection('', bottomMenu)}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="group flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-all w-full"
                    >
                        <span className="transition-transform duration-200 group-hover:scale-105">
                            {darkMode ? <LightModeIcon style={{ fontSize: 20 }} /> : <DarkModeIcon style={{ fontSize: 20 }} />}
                        </span>
                        <span className="flex-1">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                        <div className={`w-8 h-4 rounded-full transition-colors relative ${darkMode ? 'bg-primary-600' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform duration-200 ${darkMode ? 'translate-x-4' : 'translate-x-0.5'}`} />
                        </div>
                    </button>

                    {/* Logout */}
                    <button
                        onClick={onLogout}
                        className="group flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all w-full"
                    >
                        <span className="transition-transform duration-200 group-hover:scale-105">
                            <LogoutIcon style={{ fontSize: 20 }} />
                        </span>
                        <span className="flex-1">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
