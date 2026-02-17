import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { email, password } = formData;

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
        dispatch(login({ email, password }));
    };

    if (isLoading) return <Spinner />;

    const features = [
        { icon: <SecurityIcon style={{ fontSize: 20 }} />, title: 'HIPAA Compliant', desc: 'Enterprise-grade security for patient data' },
        { icon: <SpeedIcon style={{ fontSize: 20 }} />, title: 'Real-time Updates', desc: 'Live dashboards and instant notifications' },
        { icon: <DevicesIcon style={{ fontSize: 20 }} />, title: 'Multi-platform', desc: 'Access from any device, anywhere' },
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 relative overflow-hidden">
                {/* Decorative shapes */}
                <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/5 blur-xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-white/5 blur-xl" />
                <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-2xl bg-white/10 rotate-12" />

                <div className="relative z-10 flex flex-col justify-center px-16">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                            <LocalHospitalIcon style={{ fontSize: 28 }} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">MediHealth</span>
                    </div>

                    <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                        Modern Healthcare<br />Management Platform
                    </h1>
                    <p className="text-lg text-white/70 mb-12 max-w-md">
                        Streamline patient care, optimize operations, and make data-driven decisions with our comprehensive hospital management system.
                    </p>

                    <div className="space-y-5">
                        {features.map((f, i) => (
                            <div key={i} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-white flex-shrink-0">
                                    {f.icon}
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm">{f.title}</h3>
                                    <p className="text-white/60 text-sm">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center">
                            <LocalHospitalIcon style={{ fontSize: 22 }} />
                        </div>
                        <span className="text-xl font-bold text-gray-900">MediHealth</span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Welcome back</h2>
                    <p className="text-sm text-gray-500 mb-8">Enter your credentials to access your account</p>

                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                            <div className="relative">
                                <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    placeholder="you@example.com"
                                    className="glass-input w-full pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    placeholder="Enter your password"
                                    className="glass-input w-full pl-10 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <VisibilityOffIcon style={{ fontSize: 20 }} /> : <VisibilityIcon style={{ fontSize: 20 }} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                Remember me
                            </label>
                            <button type="button" className="text-primary-600 font-semibold hover:underline">Forgot password?</button>
                        </div>

                        <button type="submit" className="btn-primary w-full py-3 text-base">
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-8">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-600 font-semibold hover:underline">Create account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
