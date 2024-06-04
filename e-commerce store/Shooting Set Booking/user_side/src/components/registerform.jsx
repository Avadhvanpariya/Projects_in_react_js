import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import logo from '../assets/vartika_white.png';

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async () => {
        // Simple form validation
        if (!full_name.trim() || !email.trim() || !mobile.trim() || !password.trim()) {
            Swal.fire('Error', 'Please fill in all the fields.', 'error');
            return;
        }

        try {
            // Make an API request to your backend for user registration
            const response = await fetch('https://vartika-server-side.onrender.com/user/v1/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ full_name, email, mobile, password }),
            });

            if (response.ok) {
                const data = await response.json();
                var result = data.data;
                localStorage.setItem('authorization', result.authorization);

                Swal.fire('Success', 'Sign-up successful!', 'success').then(() => {
                    navigate('/');
                });
            } else {
                // If the response is not ok, handle the error
                const errorData = await response.json();
                Swal.fire('Error', errorData.message || 'Sign-up failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Sign-up failed', error);
            Swal.fire('Error', 'An error occurred while trying to sign up. Please try again later.', 'error');
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
                                        <p className="description">Sign-Up</p>
                                        <div className="form-group mt-3">
                                            <span className="input-icon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <input type="text" name='full_name' className="form-control" placeholder="Enter Full Name" value={full_name} onChange={(e) => setFullName(e.target.value)} />
                                        </div>
                                        <div className="form-group mt-3">
                                            <span className="input-icon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group mt-3">
                                            <span className="input-icon">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <input type="text" name='mobile' className="form-control" placeholder="Enter Mobile No." value={mobile} onChange={(e) => setMobile(e.target.value)} />
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
                                        <button className="btn mt-2" onClick={handleRegister}>Submit</button>
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

export default RegisterForm;
