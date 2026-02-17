// ─── Centralized Mock Data for Static Pages ────────────────────────────

export const hospitalStats = {
  totalPatients: 2847,
  activeDoctors: 64,
  todayAppointments: 142,
  bedOccupancy: 78,
  pendingLabTests: 23,
  emergencyCases: 7,
  revenue: 284500,
  monthlyGrowth: 12.5,
};

export const recentActivities = [
  { id: 1, type: 'appointment', message: 'New appointment booked for Dr. Sarah Chen', time: '2 min ago', icon: 'calendar' },
  { id: 2, type: 'emergency', message: 'Emergency case admitted - Triage Level: Critical', time: '15 min ago', icon: 'emergency' },
  { id: 3, type: 'lab', message: 'Lab results ready for Patient #4521', time: '32 min ago', icon: 'lab' },
  { id: 4, type: 'pharmacy', message: 'Low stock alert: Amoxicillin 500mg', time: '1 hr ago', icon: 'pharmacy' },
  { id: 5, type: 'billing', message: 'Invoice #INV-2847 paid - $1,250.00', time: '1.5 hr ago', icon: 'billing' },
  { id: 6, type: 'patient', message: 'New patient registered: Maria Garcia', time: '2 hr ago', icon: 'patient' },
  { id: 7, type: 'chat', message: 'Dr. Johnson sent a message regarding case #892', time: '3 hr ago', icon: 'chat' },
  { id: 8, type: 'insurance', message: 'Insurance claim #CLM-1893 approved', time: '4 hr ago', icon: 'insurance' },
];

export const upcomingAppointments = [
  { id: 1, patient: 'Emma Wilson', doctor: 'Dr. Sarah Chen', time: '09:00 AM', type: 'General Checkup', status: 'Confirmed', avatar: 'EW' },
  { id: 2, patient: 'James Rodriguez', doctor: 'Dr. Michael Park', time: '09:30 AM', type: 'Cardiology', status: 'Confirmed', avatar: 'JR' },
  { id: 3, patient: 'Lisa Thompson', doctor: 'Dr. Sarah Chen', time: '10:00 AM', type: 'Follow-up', status: 'Pending', avatar: 'LT' },
  { id: 4, patient: 'Robert Kim', doctor: 'Dr. Emily Davis', time: '10:30 AM', type: 'Dermatology', status: 'Confirmed', avatar: 'RK' },
  { id: 5, patient: 'Sarah Martinez', doctor: 'Dr. Johnson', time: '11:00 AM', type: 'Pediatrics', status: 'Pending', avatar: 'SM' },
  { id: 6, patient: 'David Lee', doctor: 'Dr. Michael Park', time: '11:30 AM', type: 'Orthopedics', status: 'Confirmed', avatar: 'DL' },
];

export const departments = [
  { id: 1, name: 'Cardiology', head: 'Dr. Michael Park', staff: 12, patients: 45, color: '#EF4444', icon: 'favorite' },
  { id: 2, name: 'Neurology', head: 'Dr. Sarah Chen', staff: 8, patients: 32, color: '#8B5CF6', icon: 'psychology' },
  { id: 3, name: 'Pediatrics', head: 'Dr. Emily Davis', staff: 15, patients: 67, color: '#F59E0B', icon: 'child_care' },
  { id: 4, name: 'Orthopedics', head: 'Dr. Johnson', staff: 10, patients: 38, color: '#10B981', icon: 'accessibility' },
  { id: 5, name: 'Oncology', head: 'Dr. Lisa Wang', staff: 9, patients: 28, color: '#EC4899', icon: 'biotech' },
  { id: 6, name: 'Emergency', head: 'Dr. Alex Turner', staff: 20, patients: 15, color: '#DC2626', icon: 'local_hospital' },
  { id: 7, name: 'Radiology', head: 'Dr. James Miller', staff: 6, patients: 52, color: '#0EA5E9', icon: 'image_search' },
  { id: 8, name: 'Dermatology', head: 'Dr. Rachel Kim', staff: 5, patients: 41, color: '#F97316', icon: 'healing' },
];

export const doctorsData = [
  { id: 1, name: 'Dr. Sarah Chen', specialization: 'Cardiology', experience: '15 years', rating: 4.9, patients: 1240, status: 'Available', avatar: 'SC', schedule: '9AM - 5PM', phone: '+1 (555) 234-5678', email: 'sarah.chen@medihealth.com' },
  { id: 2, name: 'Dr. Michael Park', specialization: 'Neurology', experience: '12 years', rating: 4.8, patients: 980, status: 'In Consultation', avatar: 'MP', schedule: '8AM - 4PM', phone: '+1 (555) 345-6789', email: 'michael.park@medihealth.com' },
  { id: 3, name: 'Dr. Emily Davis', specialization: 'Pediatrics', experience: '10 years', rating: 4.9, patients: 1560, status: 'Available', avatar: 'ED', schedule: '10AM - 6PM', phone: '+1 (555) 456-7890', email: 'emily.davis@medihealth.com' },
  { id: 4, name: 'Dr. Alex Johnson', specialization: 'Orthopedics', experience: '18 years', rating: 4.7, patients: 870, status: 'On Leave', avatar: 'AJ', schedule: '9AM - 5PM', phone: '+1 (555) 567-8901', email: 'alex.johnson@medihealth.com' },
  { id: 5, name: 'Dr. Lisa Wang', specialization: 'Oncology', experience: '14 years', rating: 4.9, patients: 650, status: 'Available', avatar: 'LW', schedule: '8AM - 3PM', phone: '+1 (555) 678-9012', email: 'lisa.wang@medihealth.com' },
  { id: 6, name: 'Dr. James Miller', specialization: 'Radiology', experience: '9 years', rating: 4.6, patients: 720, status: 'In Consultation', avatar: 'JM', schedule: '7AM - 3PM', phone: '+1 (555) 789-0123', email: 'james.miller@medihealth.com' },
];

export const patientsData = [
  { id: 1, name: 'Emma Wilson', age: 34, gender: 'Female', contact: '+1 (555) 111-2222', lastVisit: '2026-02-15', condition: 'Hypertension', status: 'Active', bloodGroup: 'A+', avatar: 'EW' },
  { id: 2, name: 'James Rodriguez', age: 45, gender: 'Male', contact: '+1 (555) 222-3333', lastVisit: '2026-02-14', condition: 'Diabetes Type 2', status: 'Active', bloodGroup: 'O+', avatar: 'JR' },
  { id: 3, name: 'Lisa Thompson', age: 28, gender: 'Female', contact: '+1 (555) 333-4444', lastVisit: '2026-02-10', condition: 'Asthma', status: 'Discharged', bloodGroup: 'B+', avatar: 'LT' },
  { id: 4, name: 'Robert Kim', age: 52, gender: 'Male', contact: '+1 (555) 444-5555', lastVisit: '2026-02-12', condition: 'Arthritis', status: 'Active', bloodGroup: 'AB+', avatar: 'RK' },
  { id: 5, name: 'Sarah Martinez', age: 6, gender: 'Female', contact: '+1 (555) 555-6666', lastVisit: '2026-02-16', condition: 'Flu', status: 'Active', bloodGroup: 'O-', avatar: 'SM' },
  { id: 6, name: 'David Lee', age: 67, gender: 'Male', contact: '+1 (555) 666-7777', lastVisit: '2026-02-08', condition: 'COPD', status: 'Critical', bloodGroup: 'A-', avatar: 'DL' },
  { id: 7, name: 'Maria Garcia', age: 41, gender: 'Female', contact: '+1 (555) 777-8888', lastVisit: '2026-02-17', condition: 'Migraine', status: 'Active', bloodGroup: 'B-', avatar: 'MG' },
  { id: 8, name: 'John Davis', age: 55, gender: 'Male', contact: '+1 (555) 888-9999', lastVisit: '2026-02-11', condition: 'Cardiac Arrhythmia', status: 'Active', bloodGroup: 'AB-', avatar: 'JD' },
];

export const billingData = [
  { id: 'INV-2847', patient: 'Emma Wilson', date: '2026-02-17', amount: 1250, status: 'Paid', method: 'Insurance', department: 'Cardiology' },
  { id: 'INV-2846', patient: 'James Rodriguez', date: '2026-02-16', amount: 850, status: 'Pending', method: 'Cash', department: 'Neurology' },
  { id: 'INV-2845', patient: 'Lisa Thompson', date: '2026-02-15', amount: 2100, status: 'Paid', method: 'Insurance', department: 'Orthopedics' },
  { id: 'INV-2844', patient: 'Robert Kim', date: '2026-02-14', amount: 450, status: 'Overdue', method: 'Card', department: 'Dermatology' },
  { id: 'INV-2843', patient: 'Sarah Martinez', date: '2026-02-13', amount: 320, status: 'Paid', method: 'Insurance', department: 'Pediatrics' },
  { id: 'INV-2842', patient: 'David Lee', date: '2026-02-12', amount: 3500, status: 'Pending', method: 'Insurance', department: 'Oncology' },
  { id: 'INV-2841', patient: 'Maria Garcia', date: '2026-02-11', amount: 180, status: 'Paid', method: 'Cash', department: 'General' },
  { id: 'INV-2840', patient: 'John Davis', date: '2026-02-10', amount: 5200, status: 'Partial', method: 'Insurance', department: 'Surgery' },
];

export const staffData = [
  { id: 1, name: 'Nancy Williams', role: 'Nurse', department: 'Emergency', shift: 'Day', status: 'On Duty', phone: '+1 (555) 901-2345', avatar: 'NW' },
  { id: 2, name: 'Tom Harris', role: 'Lab Technician', department: 'Laboratory', shift: 'Day', status: 'On Duty', phone: '+1 (555) 012-3456', avatar: 'TH' },
  { id: 3, name: 'Karen White', role: 'Receptionist', department: 'Front Desk', shift: 'Day', status: 'On Duty', phone: '+1 (555) 123-4567', avatar: 'KW' },
  { id: 4, name: 'Paul Brown', role: 'Pharmacist', department: 'Pharmacy', shift: 'Day', status: 'On Break', phone: '+1 (555) 234-5678', avatar: 'PB' },
  { id: 5, name: 'Julia Adams', role: 'Nurse', department: 'Pediatrics', shift: 'Night', status: 'Off Duty', phone: '+1 (555) 345-6789', avatar: 'JA' },
  { id: 6, name: 'Chris Taylor', role: 'Surgeon', department: 'Surgery', shift: 'Day', status: 'In Surgery', phone: '+1 (555) 456-7890', avatar: 'CT' },
  { id: 7, name: 'Angela Moore', role: 'Radiologist', department: 'Radiology', shift: 'Day', status: 'On Duty', phone: '+1 (555) 567-8901', avatar: 'AM' },
  { id: 8, name: 'Daniel Clark', role: 'Anesthesiologist', department: 'Surgery', shift: 'Day', status: 'On Duty', phone: '+1 (555) 678-9012', avatar: 'DC' },
];

export const bedData = [
  { id: 'ICU-01', ward: 'ICU', patient: 'David Lee', status: 'Occupied', admitDate: '2026-02-10', condition: 'Critical' },
  { id: 'ICU-02', ward: 'ICU', patient: 'John Davis', status: 'Occupied', admitDate: '2026-02-12', condition: 'Serious' },
  { id: 'ICU-03', ward: 'ICU', patient: null, status: 'Available', admitDate: null, condition: null },
  { id: 'ICU-04', ward: 'ICU', patient: null, status: 'Maintenance', admitDate: null, condition: null },
  { id: 'GEN-01', ward: 'General', patient: 'Emma Wilson', status: 'Occupied', admitDate: '2026-02-14', condition: 'Stable' },
  { id: 'GEN-02', ward: 'General', patient: null, status: 'Available', admitDate: null, condition: null },
  { id: 'GEN-03', ward: 'General', patient: 'Robert Kim', status: 'Occupied', admitDate: '2026-02-11', condition: 'Stable' },
  { id: 'GEN-04', ward: 'General', patient: null, status: 'Available', admitDate: null, condition: null },
  { id: 'GEN-05', ward: 'General', patient: 'Maria Garcia', status: 'Occupied', admitDate: '2026-02-16', condition: 'Recovering' },
  { id: 'GEN-06', ward: 'General', patient: null, status: 'Available', admitDate: null, condition: null },
  { id: 'PED-01', ward: 'Pediatric', patient: 'Sarah Martinez', status: 'Occupied', admitDate: '2026-02-15', condition: 'Stable' },
  { id: 'PED-02', ward: 'Pediatric', patient: null, status: 'Available', admitDate: null, condition: null },
  { id: 'PED-03', ward: 'Pediatric', patient: null, status: 'Available', admitDate: null, condition: null },
  { id: 'MAT-01', ward: 'Maternity', patient: null, status: 'Available', admitDate: null, condition: null },
  { id: 'MAT-02', ward: 'Maternity', patient: null, status: 'Reserved', admitDate: null, condition: null },
  { id: 'SUR-01', ward: 'Surgery', patient: null, status: 'Available', admitDate: null, condition: null },
];

export const bloodBankData = [
  { type: 'A+', units: 45, status: 'Adequate', lastDonation: '2026-02-16' },
  { type: 'A-', units: 12, status: 'Low', lastDonation: '2026-02-10' },
  { type: 'B+', units: 38, status: 'Adequate', lastDonation: '2026-02-15' },
  { type: 'B-', units: 8, status: 'Critical', lastDonation: '2026-02-05' },
  { type: 'O+', units: 62, status: 'Adequate', lastDonation: '2026-02-17' },
  { type: 'O-', units: 15, status: 'Low', lastDonation: '2026-02-12' },
  { type: 'AB+', units: 22, status: 'Adequate', lastDonation: '2026-02-14' },
  { type: 'AB-', units: 5, status: 'Critical', lastDonation: '2026-02-01' },
];

export const auditLogData = [
  { id: 1, action: 'Patient Registered', user: 'Karen White', role: 'Receptionist', timestamp: '2026-02-17 14:32:00', ip: '192.168.1.45', details: 'New patient Maria Garcia registered' },
  { id: 2, action: 'Prescription Created', user: 'Dr. Sarah Chen', role: 'Doctor', timestamp: '2026-02-17 13:15:00', ip: '192.168.1.22', details: 'Prescription for Patient Emma Wilson' },
  { id: 3, action: 'Lab Result Uploaded', user: 'Tom Harris', role: 'Lab Tech', timestamp: '2026-02-17 12:45:00', ip: '192.168.1.67', details: 'CBC results for Patient #4521' },
  { id: 4, action: 'Login', user: 'Dr. Michael Park', role: 'Doctor', timestamp: '2026-02-17 08:00:00', ip: '192.168.1.33', details: 'Successful login' },
  { id: 5, action: 'Inventory Updated', user: 'Paul Brown', role: 'Pharmacist', timestamp: '2026-02-17 07:30:00', ip: '192.168.1.55', details: 'Added 200 units of Paracetamol' },
  { id: 6, action: 'Emergency Case Created', user: 'Dr. Alex Turner', role: 'Doctor', timestamp: '2026-02-16 23:45:00', ip: '192.168.1.10', details: 'Critical case admitted' },
  { id: 7, action: 'Insurance Claim Filed', user: 'Karen White', role: 'Receptionist', timestamp: '2026-02-16 16:20:00', ip: '192.168.1.45', details: 'Claim for Patient Robert Kim' },
  { id: 8, action: 'Appointment Cancelled', user: 'Patient', role: 'Patient', timestamp: '2026-02-16 14:10:00', ip: '192.168.1.89', details: 'Cancelled appointment for Feb 18' },
];

export const feedbackData = [
  { id: 1, patient: 'Emma Wilson', doctor: 'Dr. Sarah Chen', rating: 5, comment: 'Excellent care and very thorough examination. Dr. Chen was attentive and kind.', date: '2026-02-16', department: 'Cardiology' },
  { id: 2, patient: 'James Rodriguez', doctor: 'Dr. Michael Park', rating: 4, comment: 'Very professional. Wait time was a bit long but the consultation was great.', date: '2026-02-15', department: 'Neurology' },
  { id: 3, patient: 'Lisa Thompson', doctor: 'Dr. Emily Davis', rating: 5, comment: 'Dr. Davis is wonderful with children. My daughter felt very comfortable.', date: '2026-02-14', department: 'Pediatrics' },
  { id: 4, patient: 'Robert Kim', doctor: 'Dr. Johnson', rating: 3, comment: 'Good treatment but the facility could use some updates. Overall satisfied.', date: '2026-02-13', department: 'Orthopedics' },
  { id: 5, patient: 'Sarah Martinez', doctor: 'Dr. Lisa Wang', rating: 5, comment: 'Incredibly compassionate and knowledgeable. Highly recommend.', date: '2026-02-12', department: 'Oncology' },
];

export const radiologyData = [
  { id: 1, patient: 'Emma Wilson', scanType: 'CT Scan', bodyPart: 'Chest', doctor: 'Dr. James Miller', status: 'Completed', priority: 'Normal', date: '2026-02-17' },
  { id: 2, patient: 'James Rodriguez', scanType: 'MRI', bodyPart: 'Brain', doctor: 'Dr. James Miller', status: 'In Progress', priority: 'Urgent', date: '2026-02-17' },
  { id: 3, patient: 'Robert Kim', scanType: 'X-Ray', bodyPart: 'Knee', doctor: 'Dr. James Miller', status: 'Pending', priority: 'Normal', date: '2026-02-17' },
  { id: 4, patient: 'David Lee', scanType: 'CT Scan', bodyPart: 'Abdomen', doctor: 'Dr. James Miller', status: 'Completed', priority: 'Urgent', date: '2026-02-16' },
  { id: 5, patient: 'John Davis', scanType: 'Ultrasound', bodyPart: 'Heart', doctor: 'Dr. James Miller', status: 'Completed', priority: 'High', date: '2026-02-16' },
];

export const settingsOptions = {
  profile: { name: 'Admin User', email: 'admin@medihealth.com', phone: '+1 (555) 000-1234', role: 'Administrator' },
  notifications: { email: true, push: true, sms: false, appointmentReminder: true, emergencyAlerts: true, labResults: true, billingUpdates: false },
  appearance: { theme: 'light', language: 'English', dateFormat: 'MM/DD/YYYY', timeFormat: '12h', sidebarCompact: false },
  security: { twoFactor: false, sessionTimeout: 30, loginAlerts: true, passwordLastChanged: '2026-01-15' },
};

export const helpFAQ = [
  { q: 'How do I add a new patient?', a: 'Navigate to Patients → Add Patient. Fill in the required information including personal details, medical history, and insurance information. Click "Create Patient Profile" to save.' },
  { q: 'How do I book an appointment?', a: 'Go to Appointments → Book New. Select the doctor, preferred date and time slot, and enter the reason for visit. The appointment will be pending until confirmed by the doctor.' },
  { q: 'How do I view lab results?', a: 'Navigate to the Lab section from the sidebar. You can see all lab tests with their status. Completed tests will have a download link for the results.' },
  { q: 'How do I manage inventory?', a: 'Go to Pharmacy & Inventory. You can view all items, add new items, and track low stock alerts. Items below the threshold will be highlighted.' },
  { q: 'How do I file an insurance claim?', a: 'Navigate to Insurance Claims. Click on "File Claim" and fill in the patient details, provider information, and claim amount. Track the status of your claims on the dashboard.' },
  { q: 'How do I export reports?', a: 'Go to Exports & Reports. Select the type of report you want (Patients, Appointments, Inventory, etc.) and click to download as CSV.' },
  { q: 'How do I use the emergency module?', a: 'The Emergency Department module allows you to register emergency cases with triage levels. Cases are organized by severity: Critical, Urgent, and Non-Urgent.' },
  { q: 'How do I change my password?', a: 'Go to Settings → Security tab. Click "Change Password" and follow the prompts to update your credentials.' },
];

export const weeklyChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  appointments: [24, 32, 28, 35, 42, 18, 12],
  admissions: [8, 12, 10, 15, 11, 6, 4],
  discharges: [6, 9, 11, 8, 14, 7, 5],
};

export const monthlyRevenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  revenue: [185000, 210000, 195000, 240000, 265000, 248000, 280000, 295000, 310000, 275000, 290000, 284500],
  expenses: [145000, 160000, 155000, 180000, 195000, 188000, 210000, 220000, 230000, 205000, 215000, 212000],
};

export const departmentPerformance = [
  { name: 'Cardiology', patients: 245, satisfaction: 94, revenue: 45000 },
  { name: 'Neurology', patients: 180, satisfaction: 91, revenue: 38000 },
  { name: 'Pediatrics', patients: 320, satisfaction: 97, revenue: 28000 },
  { name: 'Orthopedics', patients: 195, satisfaction: 89, revenue: 42000 },
  { name: 'Oncology', patients: 85, satisfaction: 93, revenue: 52000 },
  { name: 'Emergency', patients: 410, satisfaction: 88, revenue: 62000 },
];
