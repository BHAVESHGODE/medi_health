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
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import Spinner from '../components/Spinner';
import { API_BASE_URL } from '../config';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function AnalyticsDashboard() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get token from localStorage (direct access for simplicity here, or use Redux)
                const user = JSON.parse(localStorage.getItem('user'));
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                const response = await axios.get(`${API_BASE_URL}/api/analytics`, config);
                setData(response.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching analytics', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) return <Spinner />;

    // Mock charts data if API returns empty arrays (for demo)
    const patientInflowData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'New Patients',
                data: data?.patientInflow || [12, 19, 3, 5, 2, 3],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Revenue ($)',
                data: data?.revenueTrend || [5000, 12000, 9000, 15000, 20000],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Hospital Analytics</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-panel p-6 bg-purple-50">
                    <h3 className="text-lg font-bold text-purple-700">Total Patients</h3>
                    <p className="text-4xl font-bold">{data?.totalPatients || 0}</p>
                </div>
                <div className="glass-panel p-6 bg-blue-50">
                    <h3 className="text-lg font-bold text-blue-700">Appointments Today</h3>
                    <p className="text-4xl font-bold">{data?.appointmentsToday || 0}</p>
                </div>
                <div className="glass-panel p-6 bg-green-50">
                    <h3 className="text-lg font-bold text-green-700">Pending Revenue</h3>
                    <p className="text-4xl font-bold text-green-600">${data?.pendingRevenue || 0}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-6 bg-white">
                    <h2 className="text-xl font-bold mb-4">Patient Inflow</h2>
                    <Line options={{ responsive: true }} data={patientInflowData} />
                </div>
                <div className="glass-panel p-6 bg-white">
                    <h2 className="text-xl font-bold mb-4">Revenue Trend</h2>
                    <Bar options={{ responsive: true }} data={revenueData} />
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button className="btn-primary" onClick={() => window.print()}>Export Report (PDF)</button>
            </div>
        </div>
    );
}

export default AnalyticsDashboard;
