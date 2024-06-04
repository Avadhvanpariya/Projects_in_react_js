import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../../components/Card';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import CircularProgress from '@mui/material/CircularProgress';
import axiosInstance from '../../../js/api';


const AddUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        contactNumber: '',
        password: '',
        email: '',
        gender: '',
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userData.first_name || !userData.last_name || !userData.email || !userData.password || !userData.contactNumber || !userData.gender) {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            setIsLoading(true);
            await axiosInstance.post('/add-user', {
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                mobile: userData.contactNumber,
                password: userData.password,
                gender: userData.gender,
            });

            // Clear the form after successful submission
            setUserData({
                first_name: '',
                last_name: '',
                contactNumber: '',
                password: '',
                email: '',
                gender: '',
            });
            setIsLoading(false);
            toast.success('User added successfully!');
        } catch (error) {
            setIsLoading(false);
            console.error('Error creating User:', error);
            toast.error('Error creating User. Please try again.');
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { id, value, files } = e.target;

        setUserData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };


    const handleFileButtonClick = () => {
        document.getElementById('fileInput').click();
    };


    return (
        <div className='margintop'>
            <Row>
                <Col xl="12" lg="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h4 className="card-title">Add User</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="new-user-info">
                                <form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="first_name">First Name:</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            id="first_name"
                                                            name='first_name'
                                                            value={userData.first_name}
                                                            onChange={handleChange}
                                                            placeholder="Enter First Name"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="last_name">Last Name:</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            id="last_name"
                                                            name='last_name'
                                                            value={userData.last_name}
                                                            onChange={handleChange}
                                                            placeholder="Enter Last Name"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="contactNumber">Mobile:</Form.Label>
                                                        <Form.Control
                                                            type="contactNumber"
                                                            id="contactNumber"
                                                            name='mobile'
                                                            value={userData.contactNumber}
                                                            onChange={handleChange}
                                                            placeholder="Enter Mobile"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="email">Email:</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            id="email"
                                                            value={userData.email}
                                                            onChange={handleChange}
                                                            placeholder="Enter Email"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="password">Password:</Form.Label>
                                                        <div className="input-group">
                                                            <Form.Control
                                                                type={showPassword ? "text" : "password"}
                                                                id="password"
                                                                value={userData.password}
                                                                onChange={handleChange}
                                                                placeholder="Enter Password"
                                                            />
                                                            <Button variant="outline-secondary" style={{ padding: '6px 10px', borderWidth: '1.5px', borderColor: "#dfdfdf" }} onClick={handleTogglePassword}>
                                                                {showPassword ? <BsEyeSlash /> : <BsEye />}
                                                            </Button>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                {/* <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="dateOfBirth">Date of Birth :</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            id="dateOfBirth"
                                                            value={userData.dateOfBirth}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                </Col> */}
                                                <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="gender">Gender:</Form.Label>
                                                        <Form.Select
                                                            id="gender"
                                                            value={userData.gender}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                {/* <Col md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label htmlFor="address">Address :</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            id="address"
                                                            value={userData.address}
                                                            onChange={handleChange}
                                                            placeholder='Enter Address'
                                                        />
                                                    </Form.Group>
                                                </Col> */}
                                                <Col md={12}>
                                                    <Button type="submit" className="btn btn-primary">
                                                        Add User
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                {isLoading && <div style={{ position: 'fixed', top: '0%', left: '0%', background: '#00000094', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '999' }}>
                    <CircularProgress sx={{ color: '#59acff', width: '60px!important', height: '60px!important' }} />
                </div>}
            </Row>
        </div>
    );
};

export default AddUser;
