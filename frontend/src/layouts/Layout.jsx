import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/common/Footer';
import { useState, useEffect } from 'react';

function Layout() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(!darkMode);

    return (
        <div className="flex w-full min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
            <Sidebar
                darkMode={darkMode}
                toggleTheme={toggleTheme}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                <TopBar toggleSidebar={() => setSidebarOpen(true)} />
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto dark:text-gray-100">
                    <div className="max-w-7xl mx-auto page-enter">
                        <Outlet />
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
