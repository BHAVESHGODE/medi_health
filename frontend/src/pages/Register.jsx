import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
        };

        dispatch(register(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="glass-panel p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-primary">Register</h1>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        className="glass-input"
                        id="name"
                        name="name"
                        value={name}
                        placeholder="Enter your name"
                        onChange={onChange}
                    />
                    <input
                        type="email"
                        className="glass-input"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={onChange}
                    />
                    <input
                        type="password"
                        className="glass-input"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={onChange}
                    />
                    <button type="submit" className="btn-primary mt-4">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
