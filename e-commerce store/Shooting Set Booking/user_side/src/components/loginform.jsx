import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/vartika_white.png';

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()


    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        // Simple form validation
        if (!email.trim() || !password.trim()) {
            toast.error('Please enter both email and password.');
            return;
        }

        try {
            // Make an API request to your backend for authentication
            // const response = await fetch('http://localhost/user/v1/login-user', {
            const response = await fetch('https://vartika-server-side.onrender.com/user/v1/login-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            console.log(response.ok)
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                var result = data.data;
                localStorage.setItem('authorization', result.authorization);

                toast.success('Login successful!', {
                    onClose: () => {
                        navigate('/')
                    },
                });
            } else {
                // If the response is not ok, handle the error
                const errorData = await response.json();
                toast.error(errorData.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login failed', error);
            toast.error('An error occurred while trying to log in. Please try again later.');
        }
    };

    return (
        <div className='bgimg'>
            <div className="container">
                <div className="row">
                    <div className="modal-box">
                        <div className="col-md-12 formback">
                            <div className="modal-dialog p-3" style={{ backgroundColor: '#000', borderRadius: '10px' }} role="document">
                                <div className="modal-content clearfix">
                                    <div className="modal-body">
                                        <div>
                                            <img src={logo} alt="logo" style={{ width: '170px' }} className='m-auto mb-4' />
                                        </div>
                                        <p className="description">Login</p>
                                        <div className="form-group mt-3">
                                            <span className="input-icon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <span className="input-icon">
                                                <i className="fas fa-key"></i>
                                            </span>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div className="show-password-checkbox mt-3">
                                                <input type="checkbox" id="showPassword" checked={showPassword} onChange={handleTogglePassword} />
                                                <label htmlFor="showPassword" className='ml-2' style={{ fontSize: '14px', color: '#b8b8b8' }}>Show Password</label>
                                            </div>
                                        </div>
                                        <button className="btn mt-2" onClick={handleLogin}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
