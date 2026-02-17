import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import Spinner from '../components/Spinner';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import { API_BASE_URL } from '../config';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DownloadIcon from '@mui/icons-material/Download';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function AnalyticsDashboard() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                const response = await axios.get(`${API_BASE_URL}/api/analytics`, config);
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching analytics', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) return <Spinner />;

    const patientInflowData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'New Patients',
                data: data?.patientInflow || [12, 19, 3, 5, 2, 3],
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Revenue ($)',
                data: data?.revenueTrend || [5000, 12000, 9000, 15000, 20000],
                backgroundColor: 'rgba(16, 185, 129, 0.6)',
                borderRadius: 8,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 11, family: 'Inter' } }
            },
            y: {
                grid: { color: 'rgba(0,0,0,0.04)' },
                ticks: { font: { size: 11, family: 'Inter' } }
            },
        },
    };

    return (
        <div>
            <PageHeader
                title="Hospital Analytics"
                subtitle="Performance metrics and insights"
                icon={<AnalyticsIcon style={{ fontSize: 22 }} />}
            >
                <button 
                    className="btn-secondary flex items-center gap-2"
                    onClick={() => window.print()}
                >
                    <DownloadIcon style={{ fontSize: 18 }} /> Export Report
                </button>
            </PageHeader>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard 
                    title="Total Patients" 
                    value={data?.totalPatients || 2847} 
                    icon={<PeopleIcon style={{ fontSize: 22 }} />} 
                    color="purple" 
                    trend="up"
                    trendValue="+12.5% this month"
                />
                <StatCard 
                    title="Appointments Today" 
                    value={data?.appointmentsToday || 142} 
                    icon={<EventIcon style={{ fontSize: 22 }} />} 
                    color="sky" 
                />
                <StatCard 
                    title="Pending Revenue" 
                    value={`$${(data?.pendingRevenue || 28500).toLocaleString()}`} 
                    icon={<AttachMoneyIcon style={{ fontSize: 22 }} />} 
                    color="emerald" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-panel p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Patient Inflow</h2>
                    <div className="h-64">
                        <Line options={chartOptions} data={patientInflowData} />
                    </div>
                </div>
                <div className="glass-panel p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Revenue Trend</h2>
                    <div className="h-64">
                        <Bar options={chartOptions} data={revenueData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsDashboard;
