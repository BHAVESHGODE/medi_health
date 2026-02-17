import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLabTests, reset } from '../features/lab/labSlice';
import Spinner from '../components/Spinner';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import EmptyState from '../components/common/EmptyState';
import BiotechIcon from '@mui/icons-material/Biotech';
import DescriptionIcon from '@mui/icons-material/Description';

function LabDashboard() {
    const dispatch = useDispatch();
    const { tests, isLoading } = useSelector((state) => state.lab);

    useEffect(() => {
        dispatch(getLabTests());
        return () => { dispatch(reset()) };
    }, [dispatch]);

    if (isLoading) return <Spinner />;

    return (
        <div>
            <PageHeader
                title="Laboratory"
                subtitle="Manage lab tests and results"
                icon={<BiotechIcon style={{ fontSize: 22 }} />}
            />

            {tests.length === 0 ? (
                <EmptyState 
                    title="No lab tests found" 
                    subtitle="Lab tests will appear here when ordered by doctors" 
                />
            ) : (
                <div className="glass-panel overflow-hidden">
                    <table className="table-modern">
                        <thead>
                            <tr>
                                <th>Test Type</th>
                                <th>Patient</th>
                                <th>Doctor</th>
                                <th>Status</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map(test => (
                                <tr key={test._id}>
                                    <td className="font-medium text-gray-900 dark:text-white">{test.testType}</td>
                                    <td>{test.patient?.user?.name || 'Unknown'}</td>
                                    <td>Dr. {test.doctor?.user?.name || 'Unknown'}</td>
                                    <td>
                                        <StatusBadge status={test.status} />
                                    </td>
                                    <td>
                                        {test.resultFile ? (
                                            <a 
                                                href={test.resultFile} 
                                                className="flex items-center gap-1 text-primary-600 hover:underline text-sm font-medium"
                                            >
                                                <DescriptionIcon style={{ fontSize: 16 }} />
                                                Download
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default LabDashboard;
