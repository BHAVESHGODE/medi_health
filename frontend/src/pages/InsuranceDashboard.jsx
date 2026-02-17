import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClaims, reset } from '../features/insurance/insuranceSlice';
import Spinner from '../components/Spinner';
import PageHeader from '../components/common/PageHeader';
import StatusBadge from '../components/common/StatusBadge';
import EmptyState from '../components/common/EmptyState';
import PolicyIcon from '@mui/icons-material/Policy';

function InsuranceDashboard() {
    const dispatch = useDispatch();
    const { claims, isLoading } = useSelector((state) => state.insurance);

    useEffect(() => {
        dispatch(getClaims());
        return () => { dispatch(reset()) };
    }, [dispatch]);

    if (isLoading) return <Spinner />;

    return (
        <div>
            <PageHeader
                title="Insurance Claims"
                subtitle="Manage insurance claims and reimbursements"
                icon={<PolicyIcon style={{ fontSize: 22 }} />}
            />

            {claims.length === 0 ? (
                <EmptyState 
                    title="No claims found" 
                    subtitle="Insurance claims will appear here" 
                />
            ) : (
                <div className="glass-panel overflow-hidden">
                    <table className="table-modern">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Provider</th>
                                <th>Policy #</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims.map(claim => (
                                <tr key={claim._id}>
                                    <td className="font-medium text-gray-900 dark:text-white">
                                        {claim.patient?.user?.name || 'Unknown'}
                                    </td>
                                    <td className="text-gray-500">{claim.provider}</td>
                                    <td className="text-gray-500">{claim.policyNumber}</td>
                                    <td className="font-semibold">${claim.claimAmount}</td>
                                    <td>
                                        <StatusBadge status={claim.status} />
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

export default InsuranceDashboard;
