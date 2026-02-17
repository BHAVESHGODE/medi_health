import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createAppointment, reset } from '../features/appointments/appointmentSlice';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import PageHeader from '../components/common/PageHeader';
import EventNoteIcon from '@mui/icons-material/EventNote';

function BookAppointment() {
    const [formData, setFormData] = useState({
        doctorId: '',
        appointmentDate: '',
        timeSlot: '',
        reason: ''
    });
    const [doctors, setDoctors] = useState([]);

    const { doctorId, appointmentDate, timeSlot, reason } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.appointment
    );

    useEffect(() => {
        // Fetch doctors for dropdown
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/doctors`);
                setDoctors(response.data.data);
            } catch {
                toast.error('Could not load doctors');
            }
        };
        fetchDoctors();

        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success('Appointment booked successfully!');
            navigate('/appointments');
        }

        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createAppointment(formData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    const timeSlots = [
        { value: '09:00 - 10:00', label: '09:00 AM - 10:00 AM' },
        { value: '10:00 - 11:00', label: '10:00 AM - 11:00 AM' },
        { value: '11:00 - 12:00', label: '11:00 AM - 12:00 PM' },
        { value: '14:00 - 15:00', label: '02:00 PM - 03:00 PM' },
        { value: '15:00 - 16:00', label: '03:00 PM - 04:00 PM' },
    ];

    return (
        <div>
            <PageHeader
                title="Book Appointment"
                subtitle="Schedule a new appointment with a doctor"
                icon={<EventNoteIcon style={{ fontSize: 22 }} />}
            />

            <div className="max-w-xl mx-auto">
                <div className="glass-panel p-6 md:p-8">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Doctor</label>
                            <select
                                name="doctorId"
                                value={doctorId}
                                onChange={onChange}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                required
                            >
                                <option value="">Select a Doctor</option>
                                {doctors.map(doc => (
                                    <option key={doc._id} value={doc._id}>
                                        {doc.user?.name || 'Doctor'} - {doc.specialization}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                            <input
                                type="date"
                                name="appointmentDate"
                                value={appointmentDate}
                                onChange={onChange}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Slot</label>
                            <select
                                name="timeSlot"
                                value={timeSlot}
                                onChange={onChange}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                required
                            >
                                <option value="">Select Time</option>
                                {timeSlots.map(slot => (
                                    <option key={slot.value} value={slot.value}>
                                        {slot.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason for Visit</label>
                            <textarea
                                name="reason"
                                value={reason}
                                onChange={onChange}
                                placeholder="Describe the reason for your visit..."
                                rows={4}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5">
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookAppointment;
