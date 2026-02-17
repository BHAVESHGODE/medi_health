import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createAppointment, reset } from '../features/appointments/appointmentSlice';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { API_BASE_URL } from '../config';

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

    return (
        <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">Book Appointment</h1>
            <form onSubmit={onSubmit} className="glass-panel p-8 space-y-4">
                <div>
                    <label className="block text-sm font-bold mb-2">Select Doctor</label>
                    <select
                        name="doctorId"
                        value={doctorId}
                        onChange={onChange}
                        className="glass-input w-full"
                        required
                    >
                        <option value="">Select a Doctor</option>
                        {doctors.map(doc => (
                            <option key={doc._id} value={doc._id}>
                                {doc.user.name} - {doc.specialization}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Date</label>
                    <input
                        type="date"
                        name="appointmentDate"
                        value={appointmentDate}
                        onChange={onChange}
                        className="glass-input w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Time Slot</label>
                    <select
                        name="timeSlot"
                        value={timeSlot}
                        onChange={onChange}
                        className="glass-input w-full"
                        required
                    >
                        <option value="">Select Time</option>
                        <option value="09:00 - 10:00">09:00 - 10:00</option>
                        <option value="10:00 - 11:00">10:00 - 11:00</option>
                        <option value="11:00 - 12:00">11:00 - 12:00</option>
                        <option value="14:00 - 15:00">14:00 - 15:00</option>
                        <option value="15:00 - 16:00">15:00 - 16:00</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Reason for Visit</label>
                    <textarea
                        name="reason"
                        value={reason}
                        onChange={onChange}
                        className="glass-input w-full"
                        rows="3"
                    ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full">Confirm Booking</button>
            </form>
        </div>
    );
}

export default BookAppointment;
