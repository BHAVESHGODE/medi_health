import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAppointments, reset, addAppointmentRealtime, updateAppointmentRealtime } from '../features/appointments/appointmentSlice';
import Spinner from '../components/Spinner';
import io from 'socket.io-client';
import { SOCKET_URL } from '../config';

const socket = io(SOCKET_URL);

function AppointmentList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { appointments, isLoading } = useSelector(
        (state) => state.appointment
    );

    useEffect(() => {
        dispatch(getAppointments());

        // Socket.IO Listeners
        socket.on('new_appointment', (data) => {
            // Ideally check if this appointment belongs to the user/doctor context
            // For demo, just add it if it's relevant (or simplicity, add all)
            dispatch(addAppointmentRealtime(data.appointment));
        });

        socket.on('appointment_updated', (data) => {
            dispatch(updateAppointmentRealtime(data.appointment));
        });

        return () => {
            socket.off('new_appointment');
            socket.off('appointment_updated');
            dispatch(reset());
        };
    }, [navigate, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
                    <p className="text-gray-500">View and manage appointments</p>
                </div>
                <button
                    onClick={() => navigate('/book-appointment')}
                    className="btn-primary"
                >
                    Book New
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {appointments.length > 0 ? (
                    appointments.map((app) => (
                        <div key={app._id} className="glass-panel p-6 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg text-primary">{new Date(app.appointmentDate).toDateString()}</h3>
                                <p className="text-gray-600">{app.timeSlot} - {app.reason}</p>
                                <div className="mt-2 text-sm">
                                    <span className="font-bold">Doctor:</span> {app.doctor?.user?.name || 'Unknown'} <br />
                                    <span className="font-bold">Patient:</span> {app.patient?.user?.name || 'Unknown'}
                                </div>
                            </div>
                            <div>
                                <span className={`px-4 py-2 rounded-full text-xs font-bold ${app.status === 'Confirmed' ? 'bg-green-100 text-green-600' :
                                        app.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                                            'bg-red-100 text-red-600'
                                    }`}>
                                    {app.status}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No appointments found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default AppointmentList;
