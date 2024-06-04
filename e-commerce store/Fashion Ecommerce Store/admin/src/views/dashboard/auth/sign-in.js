import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs'; // Import eye icons
import img from '../../../assets/images/loginimg.png';
import './signin.css';
import api from '../../../js/api'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const response = await api.post("/login", { email, password });
      const token = response.data.data.authorization;

      localStorage.setItem("authorization", token);

      toast.success("Login successful", { position: "top-right", className: 'custom-toast' });

      // Redirect to the dashboard
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error);

      toast.error("Login failed. Please check your details.", {
        position: "top-right",
        className: 'custom-toast'
      });
    }
  };

  return (
    <>
      <section className="login-content">
        <Row className="m-0 align-items-center">
          <div className='col-md-6 custom-background px-md-100 px-20 ' style={{ backgroundSize: 'cover', height: '100vh' }}>
            <Row className="justify-content-center align-items-center  vh-100">
              <div className=''>
                <h1 className='login-title'>Sign in</h1>
                <Form onSubmit={handleSignIn} className='mt-50'>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email :-</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={handleEmailChange}
                      style={{ height: 'calc(2.25rem + 10px)', borderRadius: '10px' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="Password">
                    <Form.Label>Password :-</Form.Label>
                    <div className="password-input-container" style={{ position: 'relative' }}>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ height: 'calc(2.25rem + 10px)', borderRadius: '10px' }}
                      />
                      <div className="password-toggle" onClick={handleTogglePassword} style={{ position: 'absolute', right: '15px', fontSize: '20px', bottom: '8px' }}>
                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                      </div>
                    </div>
                  </Form.Group>
                  <Button style={{ background: '#003A40', width: '100%', border: 'none', borderRadius: '20px', padding: '10px 0px', fontSize: '20px' }} type="submit" className='mt-20'>
                    Sign in
                  </Button>
                </Form>
              </div>
            </Row>
          </div>
          <div className='col-md-6 d-md-block d-none justify-content-center align-items-center' style={{ backgroundColor: '#042225', backgroundSize: 'cover', height: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
              <img src={img} alt='Login' className='ml-75 mt-100 w-85' style={{ borderRadius: '10px', zIndex: '999' }} />
              <div className='bg-circle'></div>
            </div>
          </div>
        </Row>
      </section>
      <ToastContainer />
    </>
  );
};

export default SignIn;
