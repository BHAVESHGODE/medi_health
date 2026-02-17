import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale, LinearScale, PointElement, LineElement,
    ArcElement, Filler, Tooltip, Legend,
} from 'chart.js';

import StatCard from '../components/common/StatCard';
import WelcomeBanner from '../components/common/WelcomeBanner';
import ActivityFeed from '../components/common/ActivityFeed';
import QuickActionCard from '../components/common/QuickActionCard';
import ProgressRing from '../components/common/ProgressRing';
import StatusBadge from '../components/common/StatusBadge';

import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HotelIcon from '@mui/icons-material/Hotel';
import BiotechIcon from '@mui/icons-material/Biotech';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { hospitalStats, recentActivities, upcomingAppointments, weeklyChartData } from '../data/mockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Filler, Tooltip, Legend);

function Dashboard() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const lineChartData = {
        labels: weeklyChartData.labels,
        datasets: [
            {
                label: 'Appointments',
                data: weeklyChartData.appointments,
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79, 70, 229, 0.08)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#4F46E5',
            },
            {
                label: 'Admissions',
                data: weeklyChartData.admissions,
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#10B981',
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, position: 'top', labels: { usePointStyle: true, pointStyle: 'circle', padding: 20, font: { size: 12, family: 'Inter' } } },
        },
        scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11, family: 'Inter' } } },
            y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 11, family: 'Inter' } } },
        },
    };

    const doughnutData = {
        labels: ['ICU', 'General', 'Pediatric', 'Maternity', 'Surgery'],
        datasets: [{
            data: [4, 6, 3, 2, 1],
            backgroundColor: ['#EF4444', '#4F46E5', '#F59E0B', '#EC4899', '#10B981'],
            borderWidth: 0,
            cutout: '70%',
        }],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle', padding: 15, font: { size: 11, family: 'Inter' } } } },
    };

    return (
        <div>
            {/* Welcome Banner */}
            <WelcomeBanner userName={user?.name} />

            {/* KPI Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard title="Total Patients" value={hospitalStats.totalPatients.toLocaleString()} icon={<PeopleIcon style={{ fontSize: 22 }} />} color="primary" trend="up" trendValue="+12.5% this month" />
                <StatCard title="Active Doctors" value={hospitalStats.activeDoctors} icon={<LocalHospitalIcon style={{ fontSize: 22 }} />} color="emerald" trend="up" trendValue="+3 this week" />
                <StatCard title="Today's Appointments" value={hospitalStats.todayAppointments} icon={<CalendarMonthIcon style={{ fontSize: 22 }} />} color="sky" subtitle="18 pending confirmation" />
                <StatCard title="Bed Occupancy" value={`${hospitalStats.bedOccupancy}%`} icon={<HotelIcon style={{ fontSize: 22 }} />} color="amber" subtitle="12 of 16 beds occupied" />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="glass-panel p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                        <BiotechIcon style={{ fontSize: 18 }} />
                    </div>
                    <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{hospitalStats.pendingLabTests}</p>
                        <p className="text-xs text-gray-400">Pending Labs</p>
                    </div>
                </div>
                <div className="glass-panel p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                        <WarningAmberIcon style={{ fontSize: 18 }} />
                    </div>
                    <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{hospitalStats.emergencyCases}</p>
                        <p className="text-xs text-gray-400">ER Cases</p>
                    </div>
                </div>
                <div className="glass-panel p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <AttachMoneyIcon style={{ fontSize: 18 }} />
                    </div>
                    <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">${(hospitalStats.revenue / 1000).toFixed(0)}k</p>
                        <p className="text-xs text-gray-400">Revenue</p>
                    </div>
                </div>
                <div className="glass-panel p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                        <TrendingUpIcon style={{ fontSize: 18 }} />
                    </div>
                    <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">+{hospitalStats.monthlyGrowth}%</p>
                        <p className="text-xs text-gray-400">Growth</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Weekly Trends Chart */}
                <div className="lg:col-span-2 glass-panel p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Weekly Overview</h2>
                        <span className="text-xs text-gray-400">Last 7 days</span>
                    </div>
                    <div className="h-64">
                        <Line data={lineChartData} options={lineChartOptions} />
                    </div>
                </div>

                {/* Bed Occupancy Doughnut */}
                <div className="glass-panel p-6">
                    <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Ward Occupancy</h2>
                    <div className="h-48 flex items-center justify-center">
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                    <div className="mt-4 flex justify-center">
                        <ProgressRing value={78} size={70} label="Total" />
                    </div>
                </div>
            </div>

            {/* Quick Actions + Upcoming Appointments + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="glass-panel p-5">
                    <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <QuickActionCard title="Add Patient" icon={<PersonAddIcon style={{ fontSize: 20 }} />} color="primary" onClick={() => navigate('/add-patient')} />
                        <QuickActionCard title="Book Appt." icon={<EventNoteIcon style={{ fontSize: 20 }} />} color="emerald" onClick={() => navigate('/book-appointment')} />
                        <QuickActionCard title="Pharmacy" icon={<LocalPharmacyIcon style={{ fontSize: 20 }} />} color="amber" onClick={() => navigate('/pharmacy')} />
                        <QuickActionCard title="Billing" icon={<PaymentIcon style={{ fontSize: 20 }} />} color="rose" onClick={() => navigate('/billing')} />
                    </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="glass-panel p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Upcoming Today</h2>
                        <button onClick={() => navigate('/appointments')} className="text-xs text-primary-600 font-semibold hover:underline">View All</button>
                    </div>
                    <div className="space-y-3">
                        {upcomingAppointments.slice(0, 4).map((appt) => (
                            <div key={appt.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                                    {appt.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{appt.patient}</p>
                                    <p className="text-xs text-gray-400">{appt.time} • {appt.type}</p>
                                </div>
                                <StatusBadge status={appt.status} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="glass-panel p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                        <button onClick={() => navigate('/audit-log')} className="text-xs text-primary-600 font-semibold hover:underline">View All</button>
                    </div>
                    <ActivityFeed activities={recentActivities} maxItems={5} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
