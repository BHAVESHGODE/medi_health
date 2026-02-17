import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmergencyCases, createEmergencyCase, reset, addEmergencyCaseRealtime, updateEmergencyCaseRealtime } from '../features/emergency/emergencySlice';
import Spinner from '../components/Spinner';
import PageHeader from '../components/common/PageHeader';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AddIcon from '@mui/icons-material/Add';
import { SOCKET_URL } from '../config';

const socket = io(SOCKET_URL);

function EmergencyDashboard() {
    const dispatch = useDispatch();
    const { cases, isLoading } = useSelector((state) => state.emergency);

    const [showModal, setShowModal] = useState(false);
    const [newCase, setNewCase] = useState({
        patientName: '',
        triageLevel: 'Critical',
        chiefComplaint: '',
        vitals: { bp: '', hr: '', spo2: '', temp: '' }
    });

    useEffect(() => {
        dispatch(getEmergencyCases());

        socket.on('emergency_alert', (data) => {
            dispatch(addEmergencyCaseRealtime(data.case));
        });

        socket.on('emergency_updated', (data) => {
            dispatch(updateEmergencyCaseRealtime(data.case));
        });

        return () => {
            socket.off('emergency_alert');
            socket.off('emergency_updated');
            dispatch(reset());
        };
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createEmergencyCase(newCase));
        setShowModal(false);
        setNewCase({
            patientName: '',
            triageLevel: 'Critical',
            chiefComplaint: '',
            vitals: { bp: '', hr: '', spo2: '', temp: '' }
        });
    };

    if (isLoading) return <Spinner />;

    const getCaseCount = (level) => cases.filter(c => c.triageLevel === level && c.status !== 'Discharged').length;

    return (
        <div>
            <PageHeader
                title="Emergency Department"
                subtitle="Live Triage Board & Ambulance Tracking"
                icon={<WarningAmberIcon style={{ fontSize: 22 }} className="text-red-500" />}
            >
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 flex items-center gap-2"
                >
                    <AddIcon style={{ fontSize: 18 }} /> Register Emergency
                </button>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Critical', 'Urgent', 'Non-Urgent'].map(level => (
                    <div key={level} className="glass-panel p-5 min-h-[500px]">
                        <h2 className={`text-lg font-bold mb-4 pb-3 border-b ${
                            level === 'Critical' ? 'text-red-600 border-red-200 dark:border-red-800' :
                            level === 'Urgent' ? 'text-orange-500 border-orange-200 dark:border-orange-800' :
                            'text-emerald-600 border-emerald-200 dark:border-emerald-800'
                        }`}>
                            {level} ({getCaseCount(level)})
                        </h2>
                        <div className="space-y-3">
                            <AnimatePresence>
                                {cases.filter(c => c.triageLevel === level && c.status !== 'Discharged').map(c => (
                                    <Motion.div
                                        key={c._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm border-l-4"
                                        style={{ 
                                            borderColor: level === 'Critical' ? '#DC2626' : level === 'Urgent' ? '#F97316' : '#16A34A' 
                                        }}
                                    >
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{c.patientName}</h3>
                                            <span className="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded text-gray-500 dark:text-gray-400">
                                                {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{c.chiefComplaint}</p>
                                        <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                                            {c.vitals?.bp && <span>BP: {c.vitals.bp}</span>}
                                            {c.vitals?.hr && <span>HR: {c.vitals.hr}</span>}
                                        </div>
                                        <div className="mt-3 flex justify-end">
                                            <button className="text-xs text-primary-600 font-medium hover:underline">View Details</button>
                                        </div>
                                    </Motion.div>
                                ))}
                            </AnimatePresence>
                            {getCaseCount(level) === 0 && (
                                <p className="text-center text-gray-400 text-sm py-8">No cases</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg mx-4 shadow-float">
                        <h2 className="text-xl font-bold mb-5 text-red-600 dark:text-red-400">New Emergency Case</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Patient Name</label>
                                <input
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Patient Name (or Unknown)"
                                    value={newCase.patientName}
                                    onChange={e => setNewCase({ ...newCase, patientName: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Triage Level</label>
                                <select
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                    value={newCase.triageLevel}
                                    onChange={e => setNewCase({ ...newCase, triageLevel: e.target.value })}
                                >
                                    <option value="Critical">Critical (Immediate)</option>
                                    <option value="Urgent">Urgent (Wait 15m)</option>
                                    <option value="Non-Urgent">Non-Urgent (Wait 60m+)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chief Complaint</label>
                                <textarea
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Chief Complaint"
                                    rows="3"
                                    value={newCase.chiefComplaint}
                                    onChange={e => setNewCase({ ...newCase, chiefComplaint: e.target.value })}
                                    required
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <input 
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500" 
                                    placeholder="Blood Pressure" 
                                    value={newCase.vitals.bp} 
                                    onChange={e => setNewCase({ ...newCase, vitals: { ...newCase.vitals, bp: e.target.value } })} 
                                />
                                <input 
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500" 
                                    placeholder="Heart Rate" 
                                    value={newCase.vitals.hr} 
                                    onChange={e => setNewCase({ ...newCase, vitals: { ...newCase.vitals, hr: e.target.value } })} 
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)} 
                                    className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all"
                                >
                                    Admit Case
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmergencyDashboard;
