import { useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SaveIcon from '@mui/icons-material/Save';

export default function Settings() {
    const { user } = useSelector((state) => state.auth);
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        darkMode: localStorage.getItem('theme') === 'dark',
        twoFactorAuth: false,
        dataSharing: false
    });

    const handleChange = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="p-6 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-white shadow-lg">
                    <SettingsIcon style={{ fontSize: 22 }} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            </div>

            {/* User Info Section */}
            <div className="glass-panel rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <span className="text-primary-600 dark:text-primary-400 font-bold">👤</span>
                    </div>
                    Profile Information
                </h2>
                <div className="space-y-3">
                    <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                            Name
                        </p>
                        <p className="text-gray-900 dark:text-white font-medium">{user?.name || 'Not specified'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                            Email
                        </p>
                        <p className="text-gray-900 dark:text-white font-medium">{user?.email || 'Not specified'}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                            Role
                        </p>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold capitalize">
                            {user?.role || 'User'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="glass-panel rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <NotificationsIcon className="text-blue-600 dark:text-blue-400" style={{ fontSize: 18 }} />
                    </div>
                    Notification Settings
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.emailNotifications}
                                onChange={() => handleChange('emailNotifications')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:peer-checked:bg-primary-600 peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.pushNotifications}
                                onChange={() => handleChange('pushNotifications')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:peer-checked:bg-primary-600 peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Display Settings */}
            <div className="glass-panel rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <DarkModeIcon className="text-purple-600 dark:text-purple-400" style={{ fontSize: 18 }} />
                    </div>
                    Display Settings
                </h2>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enable dark theme</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.darkMode}
                            onChange={() => handleChange('darkMode')}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:peer-checked:bg-primary-600 peer-checked:bg-primary-600"></div>
                    </label>
                </div>
            </div>

            {/* Security Settings */}
            <div className="glass-panel rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <SecurityIcon className="text-red-600 dark:text-red-400" style={{ fontSize: 18 }} />
                    </div>
                    Security Settings
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Add extra security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.twoFactorAuth}
                                onChange={() => handleChange('twoFactorAuth')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:peer-checked:bg-primary-600 peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Data Sharing</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Allow sharing of anonymized data for research</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.dataSharing}
                                onChange={() => handleChange('dataSharing')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:peer-checked:bg-primary-600 peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-3">
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl"
                >
                    <SaveIcon style={{ fontSize: 20 }} />
                    Save Changes
                </button>
            </div>

            {saved && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg text-green-700 dark:text-green-300 flex items-center gap-2">
                    <span>✓</span>
                    <span>Settings saved successfully!</span>
                </div>
            )}
        </div>
    );
}
