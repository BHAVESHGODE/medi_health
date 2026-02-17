import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPatients, reset } from '../features/patients/patientSlice';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import StatusBadge from '../components/common/StatusBadge';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { CardSkeleton } from '../components/common/LoadingSkeleton';
import { patientsData } from '../data/mockData';

import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import PhoneIcon from '@mui/icons-material/Phone';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

function PatientList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { patients, isLoading } = useSelector((state) => state.patient);
    const [search, setSearch] = useState('');
    const [view, setView] = useState('grid');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        dispatch(getPatients());
        return () => { dispatch(reset()); };
    }, [dispatch]);

    const displayPatients = patients.length > 0 ? patients : [];
    const mockPatients = patientsData;

    const allPatients = displayPatients.length > 0
        ? displayPatients.map(p => ({
            _id: p._id,
            name: p.user?.name || 'Unknown',
            age: p.dateOfBirth ? new Date().getFullYear() - new Date(p.dateOfBirth).getFullYear() : '-',
            gender: p.gender || '-',
            contact: p.contactNumber || '-',
            lastVisit: p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : '-',
            status: 'Active',
            bloodGroup: '-',
            condition: '-',
            avatar: (p.user?.name || 'P').charAt(0),
        }))
        : mockPatients;

    const filters = [
        { label: 'All', value: 'all', count: allPatients.length },
        { label: 'Active', value: 'Active', count: allPatients.filter(p => p.status === 'Active').length },
        { label: 'Critical', value: 'Critical', count: allPatients.filter(p => p.status === 'Critical').length },
        { label: 'Discharged', value: 'Discharged', count: allPatients.filter(p => p.status === 'Discharged').length },
    ];

    const filtered = allPatients
        .filter(p => statusFilter === 'all' || p.status === statusFilter)
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    if (isLoading) return <CardSkeleton count={6} />;

    return (
        <div>
            <PageHeader
                title="Patients"
                subtitle={`${allPatients.length} registered patients`}
                icon={<PeopleIcon style={{ fontSize: 22 }} />}
            >
                <button onClick={() => navigate('/add-patient')} className="btn-primary flex items-center gap-2">
                    <PersonAddIcon style={{ fontSize: 18 }} /> Add Patient
                </button>
            </PageHeader>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <FilterBar filters={filters} active={statusFilter} onChange={setStatusFilter} />
                <div className="flex items-center gap-3">
                    <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patients..." className="w-64" />
                    <div className="flex items-center bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                        <button onClick={() => setView('grid')} className={`p-2 rounded-l-xl transition-colors ${view === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-400'}`}>
                            <GridViewIcon style={{ fontSize: 18 }} />
                        </button>
                        <button onClick={() => setView('list')} className={`p-2 rounded-r-xl transition-colors ${view === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-400'}`}>
                            <ViewListIcon style={{ fontSize: 18 }} />
                        </button>
                    </div>
                </div>
            </div>

            {filtered.length === 0 ? (
                <EmptyState title="No patients found" subtitle="Try adjusting your search or filter criteria" />
            ) : view === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((patient) => (
                        <div key={patient._id || patient.id} className="glass-panel p-5 card-hover">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-bold text-sm">
                                    {patient.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{patient.name}</h3>
                                    <p className="text-xs text-gray-400">{patient.gender}, {patient.age} yrs</p>
                                </div>
                                <StatusBadge status={patient.status} />
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <PhoneIcon style={{ fontSize: 14 }} /> <span>{patient.contact}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <BloodtypeIcon style={{ fontSize: 14 }} /> <span>{patient.bloodGroup}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-50 dark:border-gray-700">
                                    <span>Condition: {patient.condition}</span>
                                    <span>Last: {patient.lastVisit}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="glass-panel overflow-hidden">
                    <table className="table-modern">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Age / Gender</th>
                                <th>Blood Group</th>
                                <th>Contact</th>
                                <th>Condition</th>
                                <th>Status</th>
                                <th>Last Visit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((patient) => (
                                <tr key={patient._id || patient.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center text-xs font-bold">{patient.avatar}</div>
                                            <span className="font-medium text-gray-900 dark:text-white">{patient.name}</span>
                                        </div>
                                    </td>
                                    <td>{patient.age} / {patient.gender}</td>
                                    <td><span className="font-semibold">{patient.bloodGroup}</span></td>
                                    <td className="text-gray-500">{patient.contact}</td>
                                    <td>{patient.condition}</td>
                                    <td><StatusBadge status={patient.status} /></td>
                                    <td className="text-gray-400 text-xs">{patient.lastVisit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default PatientList;
