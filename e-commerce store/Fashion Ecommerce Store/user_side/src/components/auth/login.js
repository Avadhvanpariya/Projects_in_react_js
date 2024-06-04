import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import logo from '../../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignUp from "./signup";
import api from '../../js/api'

function Login(props) {
    const [modalShow, setModalShow] = React.useState(false);
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
            console.log(email, password);
            const response = await api.post("/login-user", { email, password });
            const token = response.data.data.authorization;

            localStorage.setItem("authorization", token);

            setModalShow(false);
            toast.success("Login successful", { position: "top-right", className: 'custom-toast' });
            window.location.reload();

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
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className="login-popup" style={{ background: 'linear-gradient(90deg, #074044 16%, #021114 119.2%)' }}>
                    <div className="">
                        <div className="mt-2 mb-4 mb-md-4 text-white">
                            <h4 style={{ fontSize: '25px' }}><i>Login / <Link onClick={() => setModalShow(true)} style={{ fontSize: '12px', textDecorationLine: 'underline', color: '#27c0d0' }}>Don't Have An Account?</Link></i></h4>
                            <SignUp show={modalShow}
                                onHide={() => setModalShow(false)} />

                        </div>
                        <Form onSubmit={handleSignIn}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label className="text-white">Email address</Form.Label>
                                <Form.Control type="email" value={email}
                                    onChange={handleEmailChange} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupLoginPassword">
                                <Form.Label className="text-white">Password</Form.Label>
                                <Form.Control type="password" value={password}
                                    onChange={handlePasswordChange} placeholder="Password" />
                            </Form.Group>
                            <Button className="mt-3 login-button" type="submit" style={{ backgroundColor: 'transparent', border: '' }}>CONTINUE</Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </>
    );
}

export default Login;
