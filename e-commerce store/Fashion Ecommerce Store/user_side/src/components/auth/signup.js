import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from '../../js/api';
import { toast } from 'react-toastify';
import Login from "./login";


function SignUp(props) {
    const [modalShow, setModalShow] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!userData.email || !userData.mobile || !userData.password || !userData.confirmPassword) {
            toast.error("Please fill in all the fields.");
            return;
        }

        if (userData.password !== userData.confirmPassword) {
            toast.error("Passwords do not match. Please re-enter your password.");
            return;
        }

        try {
            const response = await api.post("/create-user", userData);
            console.log(response.data.data.success)
            const token = response.data.data.authorization;
            localStorage.setItem("authorization", token);
            toast.success("Sign-Up successful", { position: "top-right", className: 'custom-toast' });

            setUserData({
                name: '',
                email: '',
                mobile: '',
                password: '',
                confirmPassword: '',
            });

            setModalShow(false);

        } catch (error) {
            console.error("Error creating user:", error);
            toast.error("An unexpected error occurred. Please try again later.", { position: "top-right", className: 'custom-toast' });
        }
    };

    // const handleShowLoginModal = () => {
    //     props.onHide();
    //     setShowSignUpModal(true);
    // };

    return (
        <>
            <div>
                <Modal
                    {...props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body className="login-popup" style={{ background: 'linear-gradient(90deg, #074044 16%, #021114 119.2%)' }}>
                        <div className="">
                            <h4 style={{ fontSize: '25px' }}><i>Sign Up / <Link onClick={() => setModalShow(true)} style={{ fontSize: '12px', textDecorationLine: 'underline', color: '#27c0d0' }}>I Already Have An Account.</Link></i></h4>
                            <Login show={modalShow} onHide={() => setModalShow(false)} />
                            <Form onSubmit={handleSignUp}>
                                <Form.Group className="mb-3" controlId="formGroupName">
                                    <Form.Label className="text-white">Name</Form.Label>
                                    <Form.Control type="text" name="name" value={userData.name} onChange={handleInputChange} placeholder="Enter Name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label className="text-white">Email address</Form.Label>
                                    <Form.Control type="email" name="email" value={userData.email} onChange={handleInputChange} placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupmobile">
                                    <Form.Label className="text-white">Mobile no.</Form.Label>
                                    <Form.Control type="tel" name="mobile" value={userData.mobile} onChange={handleInputChange} placeholder="Enter Mobile no." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupCreatePassword">
                                    <Form.Label className="text-white">Password</Form.Label>
                                    <Form.Control type="password" name="password" value={userData.password} onChange={handleInputChange} placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupConformPassword">
                                    <Form.Label className="text-white">Confirm Password</Form.Label>
                                    <Form.Control type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleInputChange} placeholder="Confirm" />
                                </Form.Group>
                                <Button type="submit" className="mt-3 login-button">CONTINUE</Button>
                            </Form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default SignUp;
