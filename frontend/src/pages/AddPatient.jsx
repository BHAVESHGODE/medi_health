import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPatient, reset } from '../features/patients/patientSlice';
import Spinner from '../components/Spinner';
import PageHeader from '../components/common/PageHeader';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function AddPatient() {
    const [formData, setFormData] = useState({
        dateOfBirth: '',
        gender: 'Male',
        contactNumber: '',
        address: '',
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
        <div>
            <PageHeader
                title="Add New Patient"
                subtitle="Create a new patient profile in the system"
                icon={<PersonAddIcon style={{ fontSize: 22 }} />}
            />

            <div className="max-w-3xl mx-auto">
                <div className="glass-panel p-6 md:p-8">
                    <div className="flex items-start gap-3 p-4 mb-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                        <ErrorOutlineIcon className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" style={{ fontSize: 20 }} />
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                            In this prototype, you must manually provide the User ID of the registered user to link this patient profile.
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">User ID</label>
                                <input 
                                    type="text" 
                                    name="user" 
                                    onChange={onChange} 
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={dateOfBirth}
                                    onChange={onChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={gender}
                                    onChange={onChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Number</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={contactNumber}
                                    onChange={onChange}
                                    placeholder="+1 (555) 123-4567"
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={address}
                                onChange={onChange}
                                placeholder="123 Main Street, City"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Medical History</label>
                            <textarea
                                name="medicalHistory"
                                value={medicalHistory}
                                onChange={onChange}
                                placeholder="Enter medical conditions, past surgeries, etc."
                                rows={3}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Allergies</label>
                            <textarea
                                name="allergies"
                                value={allergies}
                                onChange={onChange}
                                placeholder="List any known allergies"
                                rows={2}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Insurance Provider</label>
                                <input
                                    type="text"
                                    name="insuranceProvider"
                                    value={insuranceProvider}
                                    onChange={onChange}
                                    placeholder="e.g., Blue Cross"
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Policy Number</label>
                                <input
                                    type="text"
                                    name="insurancePolicyNumber"
                                    value={insurancePolicyNumber}
                                    onChange={onChange}
                                    placeholder="e.g., POL-123456"
                                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5">
                            Create Patient Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddPatient;
