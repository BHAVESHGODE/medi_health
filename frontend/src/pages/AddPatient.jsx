import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPatient, reset } from '../features/patients/patientSlice';
import Spinner from '../components/Spinner';

function AddPatient() {
    const [formData, setFormData] = useState({
        dateOfBirth: '',
        gender: 'Male',
        contactNumber: '',
        address: '', // simplified for now
        medicalHistory: '',
        allergies: '',
        insuranceProvider: '',
        insurancePolicyNumber: ''
    });

    const { dateOfBirth, gender, contactNumber, address, medicalHistory, allergies, insuranceProvider, insurancePolicyNumber } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.patient
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success('Patient added successfully!');
            navigate('/patients');
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
        dispatch(createPatient({ ...formData, address: { street: address } }));
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">Add New Patient Profile</h1>
            <form onSubmit={onSubmit} className="glass-panel p-8 space-y-4">
                <p className="text-sm text-yellow-600 bg-yellow-100 p-2 rounded">
                    Note: In this prototype, you must manually provide the User ID of the registered user to link this patient profile.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">User ID</label>
                        <input type="text" name="user" onChange={onChange} className="glass-input w-full" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            onChange={onChange}
                            className="glass-input w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Gender</label>
                        <select
                            name="gender"
                            value={gender}
                            onChange={onChange}
                            className="glass-input w-full"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Contact Number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={contactNumber}
                            onChange={onChange}
                            className="glass-input w-full"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={onChange}
                        className="glass-input w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Medical History (comma separated)</label>
                    <textarea
                        name="medicalHistory"
                        value={medicalHistory}
                        onChange={onChange}
                        className="glass-input w-full h-24"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-2">Allergies (comma separated)</label>
                    <textarea
                        name="allergies"
                        value={allergies}
                        onChange={onChange}
                        className="glass-input w-full h-20"
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Insurance Provider</label>
                        <input
                            type="text"
                            name="insuranceProvider"
                            value={insuranceProvider}
                            onChange={onChange}
                            className="glass-input w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Policy Number</label>
                        <input
                            type="text"
                            name="insurancePolicyNumber"
                            value={insurancePolicyNumber}
                            onChange={onChange}
                            className="glass-input w-full"
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary w-full">Create Patient Profile</button>
            </form>
        </div>
    );
}

export default AddPatient;
