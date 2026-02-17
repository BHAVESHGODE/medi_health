import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClaims, reset } from '../features/insurance/insuranceSlice';
import Spinner from '../components/Spinner';
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
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-teal-700 flex items-center gap-2">
                <PolicyIcon fontSize="large" /> Insurance Claims
            </h1>

            <div className="glass-panel p-6 overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-3">Patient</th>
                            <th className="p-3">Provider</th>
                            <th className="p-3">Policy #</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claims.map(claim => (
                            <tr key={claim._id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium">{claim.patient.user.name}</td>
                                <td className="p-3">{claim.provider}</td>
                                <td className="p-3">{claim.policyNumber}</td>
                                <td className="p-3">${claim.claimAmount}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${claim.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                            claim.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {claim.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {claims.length === 0 && <p className="text-center py-4 text-gray-500">No claims found.</p>}
            </div>
        </div>
    );
}

export default InsuranceDashboard;
