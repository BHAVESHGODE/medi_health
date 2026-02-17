import { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar({ toggleSidebar }) {
  const { user } = useSelector((state) => state.auth);
  const [searchOpen, setSearchOpen] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <MenuIcon className="text-gray-600 dark:text-gray-300" />
          </button>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <CalendarTodayIcon style={{ fontSize: 16 }} />
            <span>{today}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Toggle */}
          {searchOpen ? (
            <div className="relative animate-slide-in-right">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 18 }} />
              <input
                autoFocus
                type="text"
                placeholder="Search anything..."
                className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500">
              <SearchIcon style={{ fontSize: 20 }} />
            </button>
          )}

          {/* Help */}
          <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 hidden sm:flex">
            <HelpOutlineIcon style={{ fontSize: 20 }} />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500">
            <NotificationsNoneIcon style={{ fontSize: 20 }} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
          </button>

          {/* User */}
          <div className="flex items-center gap-2 ml-2 pl-3 border-l border-gray-200 dark:border-gray-600">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center text-sm font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 leading-tight">{user?.name || 'User'}</p>
              <p className="text-[10px] text-gray-400 capitalize">{user?.role || 'Guest'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
