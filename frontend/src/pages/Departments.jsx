import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BadgeIcon from '@mui/icons-material/Badge';
import Spinner from '../components/Spinner';

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${API_BASE_URL}/api/departments`);
                setDepartments(res.data.data || res.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching departments:', err);
                setError('Failed to fetch departments');
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-lg">
                    <ApartmentIcon style={{ fontSize: 22 }} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Departments</h1>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.length > 0 ? (
                    departments.map((dept) => (
                        <div
                            key={dept._id}
                            className="glass-panel rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-500/50 dark:hover:border-primary-400/50"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                        {dept.name}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {dept.description || 'No description available'}
                                    </p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center flex-shrink-0">
                                    <ApartmentIcon className="text-primary-600 dark:text-primary-400" />
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <BadgeIcon className="text-blue-500 text-lg" />
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Staff Count
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                                    {dept.staffCount || 0}
                                </p>
                            </div>

                            {dept.head && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
                                        Head of Department
                                    </p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                        {dept.head?.user?.name || 'TBD'}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No departments found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
