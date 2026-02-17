const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

// Models
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Department = require('./models/Department');
const Notification = require('./models/Notification');
const Appointment = require('./models/Appointment');
const Prescription = require('./models/Prescription');
const Message = require('./models/Message');
const LabTest = require('./models/LabTest');
const Bill = require('./models/Bill');
const Inventory = require('./models/Inventory');
const EmergencyCase = require('./models/EmergencyCase');
const InsuranceClaim = require('./models/InsuranceClaim');

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            Doctor.deleteMany({}),
            Patient.deleteMany({}),
            Department.deleteMany({}),
            Notification.deleteMany({}),
            Appointment.deleteMany({}),
            Prescription.deleteMany({}),
            Message.deleteMany({}),
            LabTest.deleteMany({}),
            Bill.deleteMany({}),
            Inventory.deleteMany({}),
            EmergencyCase.deleteMany({}),
            InsuranceClaim.deleteMany({}),
        ]);
        console.log('Cleared existing data');

        // ============ CREATE USERS ============
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@medihealth.com',
            password: 'Admin@123',
            role: 'admin'
        });

        const doctorUsers = await User.insertMany([
            {
                name: 'Dr. Sarah Johnson',
                email: 'sarah.johnson@medihealth.com',
                password: 'Doctor@123',
                role: 'doctor'
            },
            {
                name: 'Dr. Michael Chen',
                email: 'michael.chen@medihealth.com',
                password: 'Doctor@123',
                role: 'doctor'
            },
            {
                name: 'Dr. Emily Williams',
                email: 'emily.williams@medihealth.com',
                password: 'Doctor@123',
                role: 'doctor'
            },
            {
                name: 'Dr. James Brown',
                email: 'james.brown@medihealth.com',
                password: 'Doctor@123',
                role: 'doctor'
            }
        ]);

        const nurseUser = await User.create({
            name: 'Grace Martinez',
            email: 'grace.martinez@medihealth.com',
            password: 'Nurse@123',
            role: 'nurse'
        });

        const receptionistUser = await User.create({
            name: 'David Lee',
            email: 'david.lee@medihealth.com',
            password: 'Receptionist@123',
            role: 'receptionist'
        });

        const patientUsers = await User.insertMany([
            {
                name: 'John Smith',
                email: 'john.smith@email.com',
                password: 'Patient@123',
                role: 'patient'
            },
            {
                name: 'Alice Johnson',
                email: 'alice.johnson@email.com',
                password: 'Patient@123',
                role: 'patient'
            },
            {
                name: 'Robert Davis',
                email: 'robert.davis@email.com',
                password: 'Patient@123',
                role: 'patient'
            },
            {
                name: 'Emma Wilson',
                email: 'emma.wilson@email.com',
                password: 'Patient@123',
                role: 'patient'
            },
            {
                name: 'Michael Garcia',
                email: 'michael.garcia@email.com',
                password: 'Patient@123',
                role: 'patient'
            }
        ]);

        console.log('✓ Created users');

        // ============ CREATE DEPARTMENTS ============
        const departments = await Department.insertMany([
            {
                name: 'Cardiology',
                description: 'Heart and cardiovascular diseases',
                staffCount: 8
            },
            {
                name: 'Neurology',
                description: 'Nervous system disorders',
                staffCount: 6
            },
            {
                name: 'Orthopedics',
                description: 'Bone and joint disorders',
                staffCount: 7
            },
            {
                name: 'Emergency Medicine',
                description: 'Emergency and trauma care',
                staffCount: 12
            },
            {
                name: 'Pediatrics',
                description: 'Children and young adults',
                staffCount: 5
            }
        ]);

        console.log('✓ Created departments');

        // ============ CREATE DOCTORS ============
        const doctors = await Doctor.insertMany([
            {
                user: doctorUsers[0]._id,
                specialization: 'Cardiologist',
                qualifications: ['MD', 'Board Certified in Cardiology'],
                experience: 12,
                department: departments[0]._id,
                hospitalAffiliation: 'MediHealth Hospital',
                consultationFee: 150,
                availability: [
                    { day: 'Monday', startTime: '09:00', endTime: '17:00' },
                    { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
                    { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
                    { day: 'Thursday', startTime: '09:00', endTime: '17:00' },
                    { day: 'Friday', startTime: '09:00', endTime: '15:00' }
                ]
            },
            {
                user: doctorUsers[1]._id,
                specialization: 'Neurologist',
                qualifications: ['MD', 'Board Certified in Neurology'],
                experience: 10,
                department: departments[1]._id,
                hospitalAffiliation: 'MediHealth Hospital',
                consultationFee: 130,
                availability: [
                    { day: 'Monday', startTime: '10:00', endTime: '18:00' },
                    { day: 'Wednesday', startTime: '10:00', endTime: '18:00' },
                    { day: 'Friday', startTime: '10:00', endTime: '18:00' }
                ]
            },
            {
                user: doctorUsers[2]._id,
                specialization: 'Orthopedic Surgeon',
                qualifications: ['MD', 'Board Certified in Orthopedics'],
                experience: 15,
                department: departments[2]._id,
                hospitalAffiliation: 'MediHealth Hospital',
                consultationFee: 160,
                availability: [
                    { day: 'Tuesday', startTime: '08:00', endTime: '16:00' },
                    { day: 'Thursday', startTime: '08:00', endTime: '16:00' },
                    { day: 'Saturday', startTime: '10:00', endTime: '14:00' }
                ]
            },
            {
                user: doctorUsers[3]._id,
                specialization: 'Emergency Medicine Physician',
                qualifications: ['MD', 'Board Certified in Emergency Medicine'],
                experience: 8,
                department: departments[3]._id,
                hospitalAffiliation: 'MediHealth Hospital',
                consultationFee: 100,
                availability: [
                    { day: 'Monday', startTime: '08:00', endTime: '20:00' },
                    { day: 'Tuesday', startTime: '08:00', endTime: '20:00' },
                    { day: 'Wednesday', startTime: '08:00', endTime: '20:00' },
                    { day: 'Thursday', startTime: '08:00', endTime: '20:00' },
                    { day: 'Friday', startTime: '08:00', endTime: '20:00' },
                    { day: 'Saturday', startTime: '08:00', endTime: '16:00' },
                    { day: 'Sunday', startTime: '10:00', endTime: '18:00' }
                ]
            }
        ]);

        // Update department heads
        for (let i = 0; i < departments.length; i++) {
            await Department.findByIdAndUpdate(
                departments[i]._id,
                { head: doctors[Math.floor(Math.random() * doctors.length)]._id },
                { new: true }
            );
        }

        console.log('✓ Created doctors');

        // ============ CREATE PATIENTS ============
        const patients = await Patient.insertMany([
            {
                user: patientUsers[0]._id,
                dateOfBirth: new Date('1985-03-15'),
                gender: 'Male',
                contactNumber: '+1-555-0101',
                address: {
                    street: '123 Main Street',
                    city: 'New York',
                    state: 'NY',
                    zipCode: '10001'
                },
                bloodGroup: 'O+',
                medicalHistory: ['Diabetes', 'Hypertension'],
                allergies: ['Penicillin'],
                insuranceProvider: 'Blue Cross',
                insurancePolicyNumber: 'BC-123456'
            },
            {
                user: patientUsers[1]._id,
                dateOfBirth: new Date('1990-07-22'),
                gender: 'Female',
                contactNumber: '+1-555-0102',
                address: {
                    street: '456 Oak Avenue',
                    city: 'Los Angeles',
                    state: 'CA',
                    zipCode: '90001'
                },
                bloodGroup: 'A+',
                medicalHistory: ['Asthma'],
                allergies: ['Aspirin'],
                insuranceProvider: 'Aetna',
                insurancePolicyNumber: 'AE-789012'
            },
            {
                user: patientUsers[2]._id,
                dateOfBirth: new Date('1992-11-08'),
                gender: 'Male',
                contactNumber: '+1-555-0103',
                address: {
                    street: '789 Pine Road',
                    city: 'Chicago',
                    state: 'IL',
                    zipCode: '60601'
                },
                bloodGroup: 'B+',
                medicalHistory: [],
                allergies: [],
                insuranceProvider: 'United Health',
                insurancePolicyNumber: 'UH-345678'
            },
            {
                user: patientUsers[3]._id,
                dateOfBirth: new Date('1988-05-30'),
                gender: 'Female',
                contactNumber: '+1-555-0104',
                address: {
                    street: '321 Elm Street',
                    city: 'Houston',
                    state: 'TX',
                    zipCode: '77001'
                },
                bloodGroup: 'AB-',
                medicalHistory: ['Heart Disease'],
                allergies: ['Sulfa drugs'],
                insuranceProvider: 'Cigna',
                insurancePolicyNumber: 'CG-456789'
            },
            {
                user: patientUsers[4]._id,
                dateOfBirth: new Date('1995-09-12'),
                gender: 'Male',
                contactNumber: '+1-555-0105',
                address: {
                    street: '555 Cedar Lane',
                    city: 'Phoenix',
                    state: 'AZ',
                    zipCode: '85001'
                },
                bloodGroup: 'O-',
                medicalHistory: [],
                allergies: [],
                insuranceProvider: 'Kaiser Permanente',
                insurancePolicyNumber: 'KP-567890'
            }
        ]);

        console.log('✓ Created patients');

        // ============ CREATE APPOINTMENTS ============
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1);

        const appointments = await Appointment.insertMany([
            {
                patient: patients[0]._id,
                doctor: doctors[0]._id,
                appointmentDate: futureDate,
                timeSlot: '10:00 AM - 10:30 AM',
                status: 'Confirmed',
                reason: 'Regular checkup',
            },
            {
                patient: patients[1]._id,
                doctor: doctors[1]._id,
                appointmentDate: new Date(futureDate.getTime() + 86400000), // next day
                timeSlot: '2:00 PM - 2:30 PM',
                status: 'Confirmed',
                reason: 'Headache consultation',
            },
            {
                patient: patients[2]._id,
                doctor: doctors[2]._id,
                appointmentDate: new Date(futureDate.getTime() + 172800000), // 2 days
                timeSlot: '9:00 AM - 9:30 AM',
                status: 'Pending',
                reason: 'Knee pain',
            },
            {
                patient: patients[3]._id,
                doctor: doctors[0]._id,
                appointmentDate: futureDate,
                timeSlot: '11:00 AM - 11:30 AM',
                status: 'Completed',
                reason: 'Follow-up',
            }
        ]);

        console.log('✓ Created appointments');

        // ============ CREATE NOTIFICATIONS ============
        const notifications = await Notification.insertMany([
            {
                user: patientUsers[0]._id,
                title: 'Appointment Confirmed',
                message: 'Your appointment with Dr. Sarah Johnson on tomorrow at 10:00 AM has been confirmed.',
                type: 'success',
                read: false
            },
            {
                user: patientUsers[0]._id,
                title: 'Prescription Ready',
                message: 'Your prescription is ready at the pharmacy.',
                type: 'info',
                read: false
            },
            {
                user: patientUsers[1]._id,
                title: 'Lab Results Available',
                message: 'Your lab test results are now available in the system.',
                type: 'info',
                read: true
            },
            {
                user: patientUsers[1]._id,
                title: 'Appointment Reminder',
                message: 'You have an appointment tomorrow with Dr. Michael Chen at 2:00 PM',
                type: 'warning',
                read: false
            },
            {
                user: patientUsers[1]._id,
                title: 'Bill Payment Due',
                message: 'Your hospital bill of $1,250 is due by end of month.',
                type: 'warning',
                read: false
            },
            {
                user: doctorUsers[0]._id,
                title: 'New Patient Appointment',
                message: 'New patient appointment request from John Smith for tomorrow.',
                type: 'info',
                read: false
            },
            {
                user: doctorUsers[0]._id,
                title: 'System Update',
                message: 'System maintenance scheduled for tonight at 11:00 PM.',
                type: 'warning',
                read: true
            },
            {
                user: receptionistUser._id,
                title: 'Appointment Cancellation',
                message: 'Patient cancelled appointment scheduled for today.',
                type: 'info',
                read: false
            }
        ]);

        console.log('✓ Created notifications');

        // ============ CREATE MESSAGES ============
        const messages = await Message.insertMany([
            {
                sender: patientUsers[0]._id,
                receiver: doctorUsers[0]._id,
                content: 'Hi Doctor, I have a question about my medication.',
                status: 'sent'
            },
            {
                sender: doctorUsers[0]._id,
                receiver: patientUsers[0]._id,
                content: 'Hello John, please feel free to ask. What is your question?',
                status: 'sent'
            },
            {
                sender: patientUsers[0]._id,
                receiver: doctorUsers[0]._id,
                content: 'Should I take the medication with food or on an empty stomach?',
                status: 'sent'
            },
            {
                sender: doctorUsers[0]._id,
                receiver: patientUsers[0]._id,
                content: 'Take it with a light meal to avoid stomach upset.',
                status: 'sent'
            },
            {
                sender: patientUsers[1]._id,
                receiver: doctorUsers[1]._id,
                content: 'When should I schedule my next visit?',
                status: 'sent'
            },
            {
                sender: doctorUsers[1]._id,
                receiver: patientUsers[1]._id,
                content: 'Please schedule a follow-up in 2 weeks. You can book online.',
                status: 'sent'
            }
        ]);

        console.log('✓ Created messages');

        // ============ CREATE LAB TESTS ============
        const labTests = await LabTest.insertMany([
            {
                patient: patients[0]._id,
                doctor: doctors[0]._id,
                testType: 'Complete Blood Count (CBC)',
                status: 'Completed',
                technician: nurseUser._id,
                priority: 'Routine',
                resultNotes: 'All values within normal range.'
            },
            {
                patient: patients[1]._id,
                doctor: doctors[0]._id,
                testType: 'Blood Glucose Test',
                status: 'Completed',
                technician: nurseUser._id,
                priority: 'Routine',
                resultNotes: 'Glucose level: 95 mg/dL - Normal'
            },
            {
                patient: patients[2]._id,
                doctor: doctors[2]._id,
                testType: 'X-Ray - Knee',
                status: 'Processing',
                technician: nurseUser._id,
                priority: 'Urgent',
                resultNotes: 'Imaging in progress'
            },
            {
                patient: patients[3]._id,
                doctor: doctors[0]._id,
                testType: 'Lipid Panel',
                status: 'Completed',
                technician: nurseUser._id,
                priority: 'Routine',
                resultNotes: 'Total Cholesterol: 200 mg/dL - Borderline high'
            }
        ]);

        console.log('✓ Created lab tests');

        // ============ CREATE PRESCRIPTIONS ============
        const prescriptions = await Prescription.insertMany([
            {
                doctor: doctors[0]._id,
                patient: patients[0]._id,
                appointment: appointments[0]._id,
                medicines: [
                    {
                        name: 'Lisinopril',
                        dosage: '10mg',
                        frequency: '1-0-0',
                        duration: '30 days',
                        instructions: 'Take in the morning'
                    },
                    {
                        name: 'Metformin',
                        dosage: '500mg',
                        frequency: '0-1-0',
                        duration: '90 days',
                        instructions: 'Take with lunch'
                    }
                ],
                notes: 'For hypertension and diabetes management'
            },
            {
                doctor: doctors[1]._id,
                patient: patients[1]._id,
                appointment: appointments[1]._id,
                medicines: [
                    {
                        name: 'Ibuprofen',
                        dosage: '400mg',
                        frequency: '1-1-1',
                        duration: '10 days',
                        instructions: 'Take with food'
                    }
                ],
                notes: 'For headache relief'
            },
            {
                doctor: doctors[2]._id,
                patient: patients[2]._id,
                appointment: appointments[2]._id,
                medicines: [
                    {
                        name: 'Aspirin',
                        dosage: '325mg',
                        frequency: '1-0-1',
                        duration: '14 days',
                        instructions: 'Take with water'
                    }
                ],
                notes: 'Post-surgery medication'
            }
        ]);

        console.log('✓ Created prescriptions');

        // ============ CREATE BILLS ============
        const bills = await Bill.insertMany([
            {
                patient: patients[0]._id,
                appointment: appointments[0]._id,
                doctor: doctors[0]._id,
                items: [
                    { description: 'Consultation Fee', amount: 150 },
                    { description: 'Lab Tests', amount: 200 },
                    { description: 'Medications', amount: 85 }
                ],
                totalAmount: 435,
                status: 'Pending',
                paymentMethod: 'Cash'
            },
            {
                patient: patients[1]._id,
                appointment: appointments[1]._id,
                doctor: doctors[1]._id,
                items: [
                    { description: 'Consultation Fee', amount: 130 },
                    { description: 'Imaging', amount: 300 }
                ],
                totalAmount: 430,
                status: 'Paid',
                paymentMethod: 'Card',
                paymentDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            },
            {
                patient: patients[3]._id,
                appointment: appointments[3]._id,
                doctor: doctors[0]._id,
                items: [
                    { description: 'Consultation Fee', amount: 150 },
                    { description: 'ECG', amount: 120 },
                    { description: 'Echocardiogram', amount: 500 }
                ],
                totalAmount: 770,
                status: 'Pending',
                paymentMethod: 'Online'
            }
        ]);

        console.log('✓ Created bills');

        // ============ CREATE INVENTORY ============
        const inventory = await Inventory.insertMany([
            {
                itemName: 'Paracetamol 500mg',
                category: 'Medicine',
                quantity: 450,
                unitPrice: 0.50,
                supplier: 'PharmaCorp',
                lowStockThreshold: 100,
                manufacturer: 'PharmaCorp Ltd',
                location: 'Shelf A1'
            },
            {
                itemName: 'Surgical Gloves (Latex-free)',
                category: 'Consumable',
                quantity: 2000,
                unitPrice: 0.30,
                supplier: 'MedSupply Inc',
                lowStockThreshold: 500,
                manufacturer: 'MedSupply Inc',
                location: 'Shelf B2'
            },
            {
                itemName: 'Syringes 10ml',
                category: 'Consumable',
                quantity: 1500,
                unitPrice: 0.20,
                supplier: 'MedSupply Inc',
                lowStockThreshold: 300,
                manufacturer: 'MedSupply Inc',
                location: 'Shelf B3'
            },
            {
                itemName: 'Bandages 1\' x 3\'',
                category: 'Consumable',
                quantity: 800,
                unitPrice: 0.10,
                supplier: 'FirstAid Ltd',
                lowStockThreshold: 200,
                manufacturer: 'FirstAid Ltd',
                location: 'Shelf C1'
            },
            {
                itemName: 'IV Fluid Bags',
                category: 'Consumable',
                quantity: 300,
                unitPrice: 4.00,
                supplier: 'PharmaCorp',
                lowStockThreshold: 100,
                manufacturer: 'PharmaCorp Ltd',
                location: 'Refrigerator R1'
            }
        ]);

        console.log('✓ Created inventory');

        // ============ CREATE EMERGENCY CASES ============
        const emergencyCases = await EmergencyCase.insertMany([
            {
                patientName: 'John Smith',
                patientId: patients[0]._id,
                triageLevel: 'Critical',
                chiefComplaint: 'Severe chest pain',
                status: 'Admitted',
                assignedDoctor: doctors[0]._id,
                vitals: {
                    bp: '160/95',
                    hr: '110',
                    spo2: '94',
                    temp: '37.8'
                },
                triage: {
                    score: 1,
                    priority: 'critical',
                    at: new Date()
                },
                notes: 'Patient experiencing acute cardiac event. ECG and troponin levels sent for analysis.'
            },
            {
                patientName: 'Robert Davis',
                patientId: patients[2]._id,
                triageLevel: 'Urgent',
                chiefComplaint: 'Severe laceration on right arm',
                status: 'Admitted',
                assignedDoctor: doctors[3]._id,
                vitals: {
                    bp: '140/85',
                    hr: '95',
                    spo2: '98',
                    temp: '37.0'
                },
                triage: {
                    score: 2,
                    priority: 'urgent',
                    at: new Date()
                },
                notes: 'Requires sutures. Assessed for nerve damage.'
            },
            {
                patientName: 'Michael Garcia',
                patientId: patients[4]._id,
                triageLevel: 'Critical',
                chiefComplaint: 'Head injury from motor vehicle accident',
                status: 'Admitted',
                assignedDoctor: doctors[3]._id,
                vitals: {
                    bp: '155/90',
                    hr: '105',
                    spo2: '96',
                    temp: '37.2'
                },
                triage: {
                    score: 1,
                    priority: 'critical',
                    at: new Date()
                },
                notes: 'CT scan completed. Mild concussion. Patient stable and conscious.'
            }
        ]);

        console.log('✓ Created emergency cases');

        // ============ CREATE INSURANCE CLAIMS ============
        const insuranceClaims = await InsuranceClaim.insertMany([
            {
                patient: patients[0]._id,
                bill: bills[0]._id,
                provider: 'Blue Cross',
                policyNumber: 'BC-123456',
                claimAmount: 435,
                status: 'Pending',
                submissionDate: new Date()
            },
            {
                patient: patients[1]._id,
                bill: bills[1]._id,
                provider: 'Aetna',
                policyNumber: 'AE-789012',
                claimAmount: 430,
                status: 'Approved',
                submissionDate: new Date(),
                responseDate: new Date()
            },
            {
                patient: patients[3]._id,
                bill: bills[2]._id,
                provider: 'Cigna',
                policyNumber: 'CG-456789',
                claimAmount: 770,
                status: 'Pending',
                submissionDate: new Date()
            }
        ]);

        console.log('✓ Created insurance claims');

        console.log('\n✅ Database seeded successfully!');
        console.log('\n📝 Test Credentials:');
        console.log('=================================');
        console.log('Admin:');
        console.log('  Email: admin@medihealth.com');
        console.log('  Password: Admin@123');
        console.log('\nDoctor (Example):');
        console.log('  Email: sarah.johnson@medihealth.com');
        console.log('  Password: Doctor@123');
        console.log('\nPatient (Example):');
        console.log('  Email: john.smith@email.com');
        console.log('  Password: Patient@123');
        console.log('\nNurse:');
        console.log('  Email: grace.martinez@medihealth.com');
        console.log('  Password: Nurse@123');
        console.log('\nReceptionist:');
        console.log('  Email: david.lee@medihealth.com');
        console.log('  Password: Receptionist@123');
        console.log('=================================\n');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
