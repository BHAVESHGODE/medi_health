import { useState } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const FAQs = [
    {
        question: 'How do I book an appointment?',
        answer: 'You can book an appointment by navigating to the Appointments section and selecting a doctor and available time slot. The system will show available doctors and their schedules.'
    },
    {
        question: 'How do I view my medical records?',
        answer: 'All your medical records, lab results, and prescriptions are available in your patient dashboard. You can access them from the main menu under "Patients" or from your profile.'
    },
    {
        question: 'How do I pay my hospital bills?',
        answer: 'You can view and pay your bills from the Billing section. Multiple payment methods are accepted including credit cards, debit cards, and online payment methods.'
    },
    {
        question: 'How do I contact a doctor?',
        answer: 'You can contact doctors through the Chat section of the application. During business hours, you can also call the hospital reception desk or visit in person.'
    },
    {
        question: 'Can I cancel or reschedule an appointment?',
        answer: 'Yes, you can cancel or reschedule appointments from the Appointments section. Note that cancellations made less than 24 hours before the appointment may incur a cancellation fee.'
    },
    {
        question: 'How do I reset my password?',
        answer: 'On the login page, click "Forgot Password" and follow the instructions sent to your registered email address. You will receive a reset link that expires in 24 hours.'
    },
    {
        question: 'Is my health information secure?',
        answer: 'Yes, all your health information is encrypted and securely stored. MediHealth complies with HIPAA and other healthcare data protection regulations.'
    },
    {
        question: 'How do I update my health insurance information?',
        answer: 'You can update your insurance information in the Settings section under "Insurance Details" after logging in to your account.'
    }
];

export default function HelpCenter() {
    const [expanded, setExpanded] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFAQs = FAQs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white shadow-lg">
                    <HelpOutlineIcon style={{ fontSize: 22 }} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Help Center</h1>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" style={{ fontSize: 20 }} />
                    <input
                        type="text"
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>

            {/* FAQs */}
            <div className="space-y-3">
                {filteredFAQs.length > 0 ? (
                    filteredFAQs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="glass-panel rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                            <button
                                onClick={() => setExpanded(expanded === idx ? null : idx)}
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                            >
                                <h3 className="font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
                                <ExpandMoreIcon
                                    className={`text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                                        expanded === idx ? 'rotate-180' : ''
                                    }`}
                                    style={{ fontSize: 24 }}
                                />
                            </button>
                            {expanded === idx && (
                                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No FAQs match your search query</p>
                    </div>
                )}
            </div>

            {/* Contact Support */}
            <div className="mt-12 glass-panel rounded-xl shadow-md p-8 border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still need help?</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    If you couldn't find an answer to your question, please contact our support team. We're here to help!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Email</p>
                        <p className="text-gray-900 dark:text-white">support@medihealth.com</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Phone</p>
                        <p className="text-gray-900 dark:text-white">+1-800-MEDIHEALTH</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Hours</p>
                        <p className="text-gray-900 dark:text-white">24/7 Support</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
