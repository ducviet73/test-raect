import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom'; // Use useNavigate in React Router v6
import { useForm } from 'react-hook-form';
import "../public/bootstrap/css/haha.css";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Replacing useRouter with useNavigate

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/users/login', {
                email: data.email,
                password: data.password
            });

            if (response.data && response.data.token && response.data.user) {
                dispatch(loginSuccess(response.data));

                // Giải mã token để kiểm tra vai trò
                const token = response.data.token;
                document.cookie = `token=${token}; path=/; max-age=${60 * 60}`;
                const payload = JSON.parse(atob(token.split('.')[1]));
                console.log(payload);

                if (payload.role === 'admin') {
                    navigate('/admin'); // Replace router.push with navigate
                } else {
                    navigate('/'); // Redirect to homepage
                }
            } else {
                setError('Thông tin đăng nhập không hợp lệ.');
                dispatch(loginFailure('Thông tin đăng nhập không hợp lệ.'));
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.';
            setError(errorMessage);
            dispatch(loginFailure(errorMessage));
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="form-container sign-in-container">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="social"><i className="bi bi-google"></i></a>
                            <a href="#" className="social"><i className="bi bi-instagram"></i></a>
                        </div>
                        <span className="span">or use your account</span>
                        <input
                            className="input"
                            type="email"
                            placeholder="Email"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                        <a className="a" href="#">Forgot your password?</a>
                        <button className="button" type="submit">Sign In</button>
                        {error && <div className="error">{error}</div>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
