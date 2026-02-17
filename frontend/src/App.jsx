import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientList from './pages/PatientList';
import AddPatient from './pages/AddPatient';
import AppointmentList from './pages/AppointmentList';
import BookAppointment from './pages/BookAppointment';
import PharmacyDashboard from './pages/PharmacyDashboard';
import EmergencyDashboard from './pages/EmergencyDashboard';
import Chat from './pages/Chat';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import LabDashboard from './pages/LabDashboard';
import InsuranceDashboard from './pages/InsuranceDashboard';
import Layout from './layouts/Layout';
import TriageBoard from './pages/TriageBoard';
import NotificationsCenter from './pages/NotificationsCenter';
import GlobalSearch from './pages/GlobalSearch';
import ExportsReports from './pages/ExportsReports';
import Departments from './pages/Departments';
import StaffDirectory from './pages/StaffDirectory';
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';
import Feedback from './pages/Feedback';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="add-patient" element={<AddPatient />} />
            <Route path="appointments" element={<AppointmentList />} />
            <Route path="book-appointment" element={<BookAppointment />} />
            <Route path="pharmacy" element={<PharmacyDashboard />} />
            <Route path="emergency" element={<EmergencyDashboard />} />
            <Route path="chat" element={<Chat />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="lab" element={<LabDashboard />} />
            <Route path="insurance" element={<InsuranceDashboard />} />
            <Route path="triage" element={<TriageBoard />} />
            <Route path="notifications" element={<NotificationsCenter />} />
            <Route path="search" element={<GlobalSearch />} />
            <Route path="exports" element={<ExportsReports />} />
            <Route path="departments" element={<Departments />} />
            <Route path="staff" element={<StaffDirectory />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<HelpCenter />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
