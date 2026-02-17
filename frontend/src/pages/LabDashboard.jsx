import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLabTests, reset } from '../features/lab/labSlice';
import Spinner from '../components/Spinner';
import BiotechIcon from '@mui/icons-material/Biotech';

function LabDashboard() {
    const dispatch = useDispatch();
    const { tests, isLoading } = useSelector((state) => state.lab);

    useEffect(() => {
        dispatch(getLabTests());
        return () => { dispatch(reset()) };
    }, [dispatch]);

    if (isLoading) return <Spinner />;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-indigo-700 flex items-center gap-2">
                <BiotechIcon fontSize="large" /> Laboratory
            </h1>

            <div className="glass-panel p-6 overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-3">Test Type</th>
                            <th className="p-3">Patient</th>
                            <th className="p-3">Doctor</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map(test => (
                            <tr key={test._id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium">{test.testType}</td>
                                <td className="p-3">{test.patient.user.name}</td>
                                <td className="p-3">Dr. {test.doctor.user.name}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${test.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {test.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    {test.resultFile ? <a href={test.resultFile} className="text-blue-600 hover:underline">Download</a> : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {tests.length === 0 && <p className="text-center py-4 text-gray-500">No lab tests requested.</p>}
            </div>
        </div>
    );
}

export default LabDashboard;
