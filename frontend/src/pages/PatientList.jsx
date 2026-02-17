import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPatients, reset } from '../features/patients/patientSlice';
import Spinner from '../components/Spinner';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';

function PatientList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { patients, isLoading } = useSelector(
        (state) => state.patient
    );

    useEffect(() => {
        dispatch(getPatients());

        return () => {
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
                    <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
                    <p className="text-gray-500">Manage your patient records</p>
                </div>
                <button
                    onClick={() => navigate('/add-patient')}
                    className="btn-primary flex items-center gap-2"
                >
                    <PersonAddIcon />
                    Add Patient
                </button>
            </div>

            <div className="glass-panel p-4 mb-6 flex items-center gap-4">
                <SearchIcon className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search patients by name..."
                    className="bg-transparent border-none focus:outline-none w-full text-gray-700"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patients.length > 0 ? (
                    patients.map((patient) => (
                        <div key={patient._id} className="glass-panel p-6 hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
                                    {patient.user?.name?.charAt(0) || 'P'}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{patient.user?.name || 'Unknown'}</h3>
                                    <p className="text-sm text-gray-500">{patient.gender}, {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} yrs</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p><strong>Contact:</strong> {patient.contactNumber}</p>
                                <p><strong>Last Visit:</strong> {new Date(patient.updatedAt).toLocaleDateString()}</p>
                            </div>
                            <button className="mt-4 text-primary text-sm font-bold hover:underline">View Details</button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-10 text-gray-500">
                        No patients found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default PatientList;
