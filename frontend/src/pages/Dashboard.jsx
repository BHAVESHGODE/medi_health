import { useSelector } from 'react-redux';

const adminContent = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Patients</h3>
            <p className="text-3xl font-bold text-primary mt-2">1,234</p>
        </div>
        <div className="glass-panel p-6">
            <h3 className="text-gray-500 text-sm font-medium">Active Doctors</h3>
            <p className="text-3xl font-bold text-secondary mt-2">45</p>
        </div>
        <div className="glass-panel p-6">
            <h3 className="text-gray-500 text-sm font-medium">Today's Appointments</h3>
            <p className="text-3xl font-bold text-green-500 mt-2">89</p>
        </div>
        <div className="glass-panel p-6 col-span-3 h-64 flex items-center justify-center text-gray-400">
            Analytics Chart Placeholder
        </div>
    </div>
);

const doctorContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
            <h3 className="text-xl font-bold mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="font-bold">John Doe</p>
                    <p className="text-sm text-gray-500">10:00 AM - General Checkup</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <p className="font-bold">Jane Smith</p>
                    <p className="text-sm text-gray-500">11:30 AM - Follow up</p>
                </div>
            </div>
        </div>
        <div className="glass-panel p-6">
            <h3 className="text-xl font-bold mb-4">Patient Requests</h3>
        </div>
    </div>
);

const patientContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
            <h3 className="text-xl font-bold mb-4">My Health Status</h3>
        </div>
        <div className="glass-panel p-6">
            <h3 className="text-xl font-bold mb-4">Upcoming Appointments</h3>
        </div>
        <div className="glass-panel p-6 col-span-2">
            <h3 className="text-xl font-bold mb-4">Recent Prescriptions</h3>
        </div>
    </div>
);

function Dashboard() {
    const { user } = useSelector((state) => state.auth);
    const role = user?.role;

    let content = adminContent;
    if (role === 'doctor') content = doctorContent;
    if (role === 'patient') content = patientContent;

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome back, <span className="text-primary">{user?.name}</span>
                </h1>
                <p className="text-gray-500 mt-1">Here is what's happening with your hospital today.</p>
            </header>
            {content}
        </div>
    );
}

export default Dashboard;
