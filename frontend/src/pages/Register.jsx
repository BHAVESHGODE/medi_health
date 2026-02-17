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
            <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                {/* Abstract background elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-[15%] right-[15%] w-96 h-96 rounded-full bg-emerald-500 blur-[120px]" />
                    <div className="absolute bottom-[25%] left-[10%] w-80 h-80 rounded-full bg-teal-500 blur-[100px]" />
                    <div className="absolute top-[50%] left-[30%] w-60 h-60 rounded-full bg-cyan-500 blur-[80px]" />
                </div>
                
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" 
                    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
                />

                <div className="relative z-10 flex flex-col justify-center px-16 py-12">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <LocalHospitalIcon style={{ fontSize: 28 }} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">MediHealth</span>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white leading-[1.2]">
                                Join the Team
                            </h1>
                            <p className="text-lg text-slate-400 mt-4 max-w-md leading-relaxed">
                                Get started with MediHealth and streamline your healthcare operations with powerful tools.
                            </p>
                        </div>

                        {/* Feature highlights - minimal */}
                        <div className="space-y-3">
                            {[
                                'Access patient records securely',
                                'Real-time appointment scheduling',
                                'Comprehensive analytics dashboard'
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircleIcon className="text-emerald-400" style={{ fontSize: 18 }} />
                                    <span className="text-slate-300 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom note */}
                    <div className="mt-auto pt-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-sm text-slate-400">Trusted by 500+ healthcare facilities</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-[45%] flex items-center justify-center p-8 bg-white dark:bg-gray-900">
                <div className="w-full max-w-md">
                    <div className="flex items-center gap-2 mb-10 lg:hidden">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <LocalHospitalIcon style={{ fontSize: 22 }} />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">MediHealth</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h2>
                        <p className="text-sm text-gray-500 mt-1.5">Get started with MediHealth in seconds</p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <PersonIcon className="text-gray-400" style={{ fontSize: 18 }} />
                                </div>
                                <input type="text" name="name" value={name} onChange={onChange} placeholder="John Doe" className="block w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-400" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <EmailIcon className="text-gray-400" style={{ fontSize: 18 }} />
                                </div>
                                <input type="email" name="email" value={email} onChange={onChange} placeholder="you@example.com" className="block w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-400" required />
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
                                    name="password" value={password} onChange={onChange}
                                    placeholder="Create a strong password"
                                    className="block w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-gray-400" required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                    {showPassword ? <VisibilityOffIcon style={{ fontSize: 18 }} /> : <VisibilityIcon style={{ fontSize: 18 }} />}
                                </button>
                            </div>
                            {password && (
                                <div className="mt-3 space-y-2">
                                    {passwordChecks.map((check, i) => (
                                        <div key={i} className={`flex items-center gap-2 text-xs ${check.met ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${check.met ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                                            {check.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex items-start gap-2">
                            <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                            <span className="text-xs text-gray-500">
                                I agree to the <button type="button" className="text-primary-600 font-medium hover:underline">Terms</button> and <button type="button" className="text-primary-600 font-medium hover:underline">Privacy Policy</button>
                            </span>
                        </div>

                        <button type="submit" className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5">
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
