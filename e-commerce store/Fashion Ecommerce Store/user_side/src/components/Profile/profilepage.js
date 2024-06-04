import React, { useState, useEffect } from "react";
import img from "../../assets/images/profileimg.jpg";
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axiosInstance from '../../js/api';


const UserUpdate = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        profile_image: '',
        mobile: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        country: '',
        pin_code: '',
        selectedFile: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/get-profile`);
                const userData = response.data.data;
                const userAddress = userData.address || ''

                if (userData) {
                    setFormData((prevData) => ({
                        ...prevData,
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        mobile: userData.mobile,
                        email: userData.email,
                        profile_image: userData.profile_image,
                        address_line_1: userAddress.address_line_1 || '',
                        address_line_2: userAddress.address_line_2 || '',
                        city: userAddress.city || '',
                        state: userAddress.state || '',
                        country: userAddress.country || '',
                        pin_code: userAddress.pin_code || '',
                    }));
                } else {
                    console.error('User not found');
                    toast.error('User not found');
                }
            } catch (error) {
                console.error('Error fetching User details:', error);
                toast.error('Error fetching User details');
            }
        };

        fetchData();
    }, []);

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    const handleChange = async (e) => {
        const { id, value, files } = e.target;

        if (id === 'fileInput' && files.length > 0) {
            const file = files[0];

            if (!allowedImageTypes.includes(file.type)) {
                toast.error('Invalid image format. Please upload a valid image.');
                return;
            }

            const formData = new FormData();
            formData.append('files', file);

            try {
                const response = await axiosInstance.post("/file-upload", formData);
                const uploadedImageUrl = response.data.data.fileURLs[0];

                setFormData((prevData) => ({
                    ...prevData,
                    profile_image: uploadedImageUrl,
                    selectedFile: file,
                }));
            } catch (error) {
                console.error('Error uploading file:', error);
                toast.error('Error uploading file');
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        }
    };


    const handleFileButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("/update-user-profile", {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                mobile: formData.mobile,
                profile_image: formData.profile_image,
                address_line_1: formData.address_line_1,
                address_line_2: formData.address_line_2,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                pin_code: formData.pin_code,
            });

            toast.success('User details updated successfully', { autoClose: 2000 });
        } catch (error) {
            console.error('Error updating User details:', error);
            toast.error('Error updating User details');
        }
    };

    return (
        <>
            <div class="account-header pt-4">
                <div className="container">
                    <div class="d-flex flex-column justify-content-between">
                        <h5 class="page-title" style={{ color: '#074044' }}>MY ACCOUNT</h5>
                        <h1 class="page-heading">Hii,{formData.first_name || 'Raj Rachna User'}</h1>
                        <p class="profile-description">From My Account , you have the ability to view your recent account activities and update your account information.</p>
                    </div>
                </div>
            </div>
            <div className="py-5">
                <div className="container">
                    <Col xl='12' lg='12'>
                        <Row>
                            <div className='col-12'>
                                <Card>
                                    <Card.Body>
                                        <form onSubmit={handleSubmit}>
                                            <Row>
                                                <Col md={4} className='text-center mt-3 px-3'>
                                                    <img alt='Photos' src={formData.profile_image || img} style={{ borderRadius: '8px', width: '100%' }} />
                                                    <div>
                                                        <Button
                                                            type='button'
                                                            variant='btn btn-primary'
                                                            className='mt-2 px-2 py-1 mb-2'
                                                            onClick={handleFileButtonClick}
                                                        >
                                                            <PhotoCameraIcon /> Upload
                                                        </Button>
                                                        <input
                                                            type='file'
                                                            id='fileInput'
                                                            className='d-none'
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <p
                                                        className='mt-lg-2'
                                                        style={{ color: 'red', fontSize: '14px', fontWeight: '600' }}
                                                    >
                                                        Note: Photo/Image Size Limit only 1 MB
                                                    </p>
                                                </Col>
                                                <Col md={8} className='mt-30'>
                                                    <Row>
                                                        <Col md={6} className="px-2">
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="first_name">First Name:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="first_name"
                                                                    name='first_name'
                                                                    value={formData.first_name}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter First Name"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6} className="px-2">
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="last_name">Last Name:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="last_name"
                                                                    name='last_name'
                                                                    value={formData.last_name}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Last Name"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6} className="px-2">
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="mobile">Mobile:</Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    id="mobile"
                                                                    name='mobile'
                                                                    value={formData.mobile}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Mobile"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6} className="px-2">
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="email">Email:</Form.Label>
                                                                <Form.Control
                                                                    type="email"
                                                                    id="email"
                                                                    name='email'
                                                                    value={formData.email}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Email"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6} className="px-2">
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="email">Address 1:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="address_line_1"
                                                                    name='address_line_1'
                                                                    value={formData.address_line_1}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Address 1"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6} className="px-2">
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="email">Address 2:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="address_line_2"
                                                                    name='address_line_2'
                                                                    value={formData.address_line_2}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Address 2"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6} className="px-2">
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="email">City:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="city"
                                                                    name='city'
                                                                    value={formData.city}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter City"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6} className="px-2">
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="email">State:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="state"
                                                                    name='state'
                                                                    value={formData.state}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter State"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6} className="px-2">
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="email">Country:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="country"
                                                                    name='country'
                                                                    value={formData.country}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter State"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6} className="px-2">
                                                            <Form.Group className="mb-3">
                                                                <Form.Label htmlFor="email">Pin Code:</Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    id="pin_code"
                                                                    name='pin_code'
                                                                    value={formData.pin_code}
                                                                    onChange={handleChange}
                                                                    placeholder="Enter Pin Code"
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={12} className="px-2">
                                                            <Button type="submit" className="btn btn-success">
                                                                Submit
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </form>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Row>
                    </Col>
                </div>
            </div>
        </>
    );
}

export default UserUpdate;
