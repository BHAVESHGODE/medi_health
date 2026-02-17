import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { name, email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess || user) navigate('/');
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ name, email, password }));
    };

    if (isLoading) return <Spinner />;

    const passwordChecks = [
        { label: 'At least 8 characters', met: password.length >= 8 },
        { label: 'Contains a number', met: /\d/.test(password) },
        { label: 'Contains uppercase', met: /[A-Z]/.test(password) },
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left Panel */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 relative overflow-hidden">
                <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/5 blur-xl" />
                <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-white/5 blur-xl" />

                <div className="relative z-10 flex flex-col justify-center px-16">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                            <LocalHospitalIcon style={{ fontSize: 28 }} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">MediHealth</span>
                    </div>

                    <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                        Join the Future of<br />Healthcare Management
                    </h1>
                    <p className="text-lg text-white/70 mb-12 max-w-md">
                        Create your account and start managing patient care with the most advanced hospital management platform.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: '10K+', label: 'Patients Managed' },
                            { value: '500+', label: 'Healthcare Staff' },
                            { value: '99.9%', label: 'Uptime SLA' },
                            { value: '24/7', label: 'Support Available' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-4">
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                <p className="text-sm text-white/60">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
                <div className="w-full max-w-md">
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                            <LocalHospitalIcon style={{ fontSize: 22 }} />
                        </div>
                        <span className="text-xl font-bold text-gray-900">MediHealth</span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Create your account</h2>
                    <p className="text-sm text-gray-500 mb-8">Get started with MediHealth in seconds</p>

                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                            <div className="relative">
                                <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                                <input type="text" name="name" value={name} onChange={onChange} placeholder="John Doe" className="glass-input w-full pl-10" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                            <div className="relative">
                                <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                                <input type="email" name="email" value={email} onChange={onChange} placeholder="you@example.com" className="glass-input w-full pl-10" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password" value={password} onChange={onChange}
                                    placeholder="Create a strong password"
                                    className="glass-input w-full pl-10 pr-10" required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPassword ? <VisibilityOffIcon style={{ fontSize: 20 }} /> : <VisibilityIcon style={{ fontSize: 20 }} />}
                                </button>
                            </div>
                            {password && (
                                <div className="mt-2 space-y-1">
                                    {passwordChecks.map((check, i) => (
                                        <div key={i} className={`flex items-center gap-1.5 text-xs ${check.met ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            <CheckCircleIcon style={{ fontSize: 14 }} />
                                            {check.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex items-start gap-2">
                            <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <span className="text-xs text-gray-500">
                                I agree to the <button type="button" className="text-primary-600 font-semibold hover:underline">Terms of Service</button> and <button type="button" className="text-primary-600 font-semibold hover:underline">Privacy Policy</button>
                            </span>
                        </div>

                        <button type="submit" className="btn-primary w-full py-3 text-base bg-emerald-600 hover:bg-emerald-700">
                            Create Account
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-600 font-semibold hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
