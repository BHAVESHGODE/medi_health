import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import BadgeIcon from '@mui/icons-material/Badge';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import Spinner from '../components/Spinner';

export default function StaffDirectory() {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterRole, setFilterRole] = useState('all');

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${API_BASE_URL}/api/doctors`);
                setStaff(res.data.data || res.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching staff:', err);
                setError('Failed to fetch staff directory');
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, []);

    const filteredStaff = filterRole === 'all' ? staff : staff.filter(s => s.user?.role === filterRole);

    if (loading) return <Spinner />;

    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg">
                    <BadgeIcon style={{ fontSize: 22 }} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Staff Directory</h1>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
                    {error}
                </div>
            )}

            {/* Filter */}
            <div className="mb-6 flex gap-2">
                <button
                    onClick={() => setFilterRole('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        filterRole === 'all'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                    All Staff
                </button>
                {['doctor'].map(role => (
                    <button
                        key={role}
                        onClick={() => setFilterRole(role)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                            filterRole === role
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        {role}s
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStaff.length > 0 ? (
                    filteredStaff.map((member) => (
                        <div
                            key={member._id}
                            className="glass-panel rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-500/50 dark:hover:border-primary-400/50"
                        >
                            {/* Header with Avatar */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                                    {member.user?.name?.charAt(0).toUpperCase() || 'S'}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {member.user?.name || 'Staff Member'}
                                    </h2>
                                    <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold capitalize">
                                        {member.specialization || member.user?.role || 'Staff'}
                                    </p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-3 mb-4">
                                {member.department && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">Department:</span>
                                        <span className="text-gray-600 dark:text-gray-400">{member.department.name || 'General'}</span>
                                    </div>
                                )}
                                
                                {member.qualifications && member.qualifications.length > 0 && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300 flex-shrink-0">Qualifications:</span>
                                        <span className="text-gray-600 dark:text-gray-400">{member.qualifications.join(', ')}</span>
                                    </div>
                                )}

                                {member.experience && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">Experience:</span>
                                        <span className="text-gray-600 dark:text-gray-400">{member.experience} years</span>
                                    </div>
                                )}

                                {member.consultationFee && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">Consultation Fee:</span>
                                        <span className="text-gray-600 dark:text-gray-400">${member.consultationFee}</span>
                                    </div>
                                )}
                            </div>

                            {/* Contact */}
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                                {member.user?.email && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <EmailIcon className="text-gray-500 dark:text-gray-400" style={{ fontSize: 16 }} />
                                        <span className="text-gray-600 dark:text-gray-400 break-all">{member.user.email}</span>
                                    </div>
                                )}
                                {member.hospitalAffiliation && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <LocalPhoneIcon className="text-gray-500 dark:text-gray-400" style={{ fontSize: 16 }} />
                                        <span className="text-gray-600 dark:text-gray-400">{member.hospitalAffiliation}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No staff members found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
