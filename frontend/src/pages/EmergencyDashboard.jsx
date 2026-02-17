import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmergencyCases, createEmergencyCase, reset, addEmergencyCaseRealtime, updateEmergencyCaseRealtime } from '../features/emergency/emergencySlice';
import Spinner from '../components/Spinner';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
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
            // You would also trigger a toast/sound notification here
            const audio = new Audio('/alert.mp3'); // Mock alert sound
            audio.play().catch(() => null);
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
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-red-600 flex items-center gap-2">
                        <WarningAmberIcon fontSize="large" /> Emergency Department
                    </h1>
                    <p className="text-gray-500">Live Triage Board & Ambulance Tracking</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-lg hover:shadow-red-500/30 flex items-center gap-2"
                >
                    Register Emergency Case
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Triage Columns */}
                {['Critical', 'Urgent', 'Non-Urgent'].map(level => (
                    <div key={level} className="glass-panel p-4 bg-opacity-50 min-h-[500px]">
                        <h2 className={`text-xl font-bold mb-4 border-b pb-2 ${level === 'Critical' ? 'text-red-600 border-red-200' :
                                level === 'Urgent' ? 'text-orange-500 border-orange-200' :
                                    'text-green-600 border-green-200'
                            }`}>
                            {level} ({cases.filter(c => c.triageLevel === level && c.status !== 'Discharged').length})
                        </h2>
                        <div className="space-y-4">
                            <AnimatePresence>
                                {cases.filter(c => c.triageLevel === level && c.status !== 'Discharged').map(c => (
                                    <Motion.div
                                        key={c._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-l-current"
                                        style={{ borderColor: level === 'Critical' ? '#DC2626' : level === 'Urgent' ? '#F97316' : '#16A34A' }}
                                    >
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold">{c.patientName}</h3>
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{new Date(c.createdAt).toLocaleTimeString()}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{c.chiefComplaint}</p>
                                        <div className="mt-2 text-xs grid grid-cols-2 gap-1 text-gray-500">
                                            <span>BP: {c.vitals?.bp || '-'}</span>
                                            <span>HR: {c.vitals?.hr || '-'}</span>
                                        </div>
                                        <div className="mt-3 flex justify-end">
                                            <button className="text-xs text-blue-600 font-bold hover:underline">View Details</button>
                                        </div>
                                    </Motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="glass-panel p-8 w-full max-w-lg bg-white">
                        <h2 className="text-2xl font-bold mb-6 text-red-600">New Emergency Case</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                className="glass-input w-full"
                                placeholder="Patient Name (or Unknown)"
                                value={newCase.patientName}
                                onChange={e => setNewCase({ ...newCase, patientName: e.target.value })}
                                required
                            />
                            <select
                                className="glass-input w-full"
                                value={newCase.triageLevel}
                                onChange={e => setNewCase({ ...newCase, triageLevel: e.target.value })}
                            >
                                <option value="Critical">Critical (Immediate)</option>
                                <option value="Urgent">Urgent (Wait 15m)</option>
                                <option value="Non-Urgent">Non-Urgent (Wait 60m+)</option>
                            </select>
                            <textarea
                                className="glass-input w-full"
                                placeholder="Chief Complaint"
                                rows="3"
                                value={newCase.chiefComplaint}
                                onChange={e => setNewCase({ ...newCase, chiefComplaint: e.target.value })}
                                required
                            ></textarea>
                            <div className="grid grid-cols-2 gap-4">
                                <input className="glass-input" placeholder="BP" value={newCase.vitals.bp} onChange={e => setNewCase({ ...newCase, vitals: { ...newCase.vitals, bp: e.target.value } })} />
                                <input className="glass-input" placeholder="Heart Rate" value={newCase.vitals.hr} onChange={e => setNewCase({ ...newCase, vitals: { ...newCase.vitals, hr: e.target.value } })} />
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
                                <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">Admit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmergencyDashboard;
