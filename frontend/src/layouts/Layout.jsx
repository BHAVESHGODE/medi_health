import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

function Layout() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

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
        <div className={`flex w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}>
            <Sidebar darkMode={darkMode} toggleTheme={toggleTheme} />
            <div className="flex-1 ml-64 p-8 overflow-y-auto h-screen dark:text-gray-100">
                <Outlet />
            </div>
            <ToastContainer />
        </div>
    );
}

export default Layout;
