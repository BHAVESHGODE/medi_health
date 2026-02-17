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

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                {/* Abstract background elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-[10%] left-[10%] w-96 h-96 rounded-full bg-primary-500 blur-[120px]" />
                    <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-emerald-500 blur-[100px]" />
                    <div className="absolute top-[40%] left-[40%] w-60 h-60 rounded-full bg-cyan-500 blur-[80px]" />
                </div>
                
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" 
                    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
                />

                <div className="relative z-10 flex flex-col justify-center px-16 py-12">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                            <LocalHospitalIcon style={{ fontSize: 28 }} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">MediHealth</span>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white leading-[1.2]">
                                Your Command Center
                            </h1>
                            <p className="text-lg text-slate-400 mt-4 max-w-md leading-relaxed">
                                Access patient records, manage appointments, and coordinate care—all from one place.
                            </p>
                        </div>

                        {/* Trust indicators - more subtle */}
                        <div className="flex items-center gap-6 pt-4">
                            <div className="flex -space-x-3">
                                {['SC', 'MP', 'ED', 'AJ'].map((initials, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs font-medium text-white">
                                        {initials}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm text-slate-400">
                                <span className="text-white font-medium">50+ </span> healthcare professionals online
                            </div>
                        </div>
                    </div>

                    {/* Bottom stats - more compact */}
                    <div className="mt-auto pt-12">
                        <div className="flex gap-8">
                            <div>
                                <p className="text-3xl font-bold text-white">2.8k</p>
                                <p className="text-sm text-slate-500">Active Patients</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">99.2%</p>
                                <p className="text-sm text-slate-500">System Uptime</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">24/7</p>
                                <p className="text-sm text-slate-500">Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-[45%] flex items-center justify-center p-8 bg-white dark:bg-gray-900">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="flex items-center gap-2 mb-10 lg:hidden">
                        <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-500/30">
                            <LocalHospitalIcon style={{ fontSize: 22 }} />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">MediHealth</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
                        <p className="text-sm text-gray-500 mt-1.5">Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <EmailIcon className="text-gray-400" style={{ fontSize: 18 }} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    placeholder="you@example.com"
                                    className="block w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-gray-400"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockIcon className="text-gray-400" style={{ fontSize: 18 }} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    placeholder="Enter your password"
                                    className="block w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-gray-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <VisibilityOffIcon style={{ fontSize: 18 }} /> : <VisibilityIcon style={{ fontSize: 18 }} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                <span>Remember me</span>
                            </label>
                            <button type="button" className="text-primary-600 font-medium hover:underline">Forgot password?</button>
                        </div>

                        <button type="submit" className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5">
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
