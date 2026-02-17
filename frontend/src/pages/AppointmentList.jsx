import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAppointments, reset, addAppointmentRealtime, updateAppointmentRealtime } from '../features/appointments/appointmentSlice';
import io from 'socket.io-client';
import { SOCKET_URL } from '../config';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { TableSkeleton } from '../components/common/LoadingSkeleton';
import { upcomingAppointments } from '../data/mockData';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const socket = io(SOCKET_URL);

function AppointmentList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { appointments, isLoading } = useSelector((state) => state.appointment);
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        dispatch(getAppointments());
        socket.on('new_appointment', (data) => dispatch(addAppointmentRealtime(data.appointment)));
        socket.on('appointment_updated', (data) => dispatch(updateAppointmentRealtime(data.appointment)));
        return () => {
            socket.off('new_appointment');
            socket.off('appointment_updated');
            dispatch(reset());
        };
    }, [dispatch]);

    const displayData = appointments.length > 0
        ? appointments.map(app => ({
            id: app._id,
            patient: app.patient?.user?.name || 'Unknown',
            doctor: app.doctor?.user?.name || 'Unknown',
            date: new Date(app.appointmentDate).toLocaleDateString(),
            time: app.timeSlot,
            type: app.reason || 'Consultation',
            status: app.status,
            avatar: (app.patient?.user?.name || 'U').charAt(0),
        }))
        : upcomingAppointments;

    const filters = [
        { label: 'All', value: 'all', count: displayData.length },
        { label: 'Confirmed', value: 'Confirmed', count: displayData.filter(a => a.status === 'Confirmed').length },
        { label: 'Pending', value: 'Pending', count: displayData.filter(a => a.status === 'Pending').length },
    ];

    const filtered = displayData.filter(a => statusFilter === 'all' || a.status === statusFilter);

    if (isLoading) return <TableSkeleton />;

    return (
        <div>
            <PageHeader
                title="Appointments"
                subtitle={`${displayData.length} total appointments`}
                icon={<CalendarMonthIcon style={{ fontSize: 22 }} />}
            >
                <button onClick={() => navigate('/book-appointment')} className="btn-primary flex items-center gap-2">
                    <AddIcon style={{ fontSize: 18 }} /> Book Appointment
                </button>
            </PageHeader>

            <FilterBar filters={filters} active={statusFilter} onChange={setStatusFilter} className="mb-6" />

            {filtered.length === 0 ? (
                <EmptyState title="No appointments found" subtitle="Book a new appointment to get started" />
            ) : (
                <div className="space-y-3">
                    {filtered.map((appt) => (
                        <div key={appt.id} className="glass-panel p-5 card-hover flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                {appt.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 dark:text-white">{appt.patient}</h3>
                                <p className="text-sm text-gray-500">with {appt.doctor} • {appt.type}</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <CalendarMonthIcon style={{ fontSize: 16 }} />
                                <span>{appt.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <AccessTimeIcon style={{ fontSize: 16 }} />
                                <span>{appt.time}</span>
                            </div>
                            <StatusBadge status={appt.status} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AppointmentList;
