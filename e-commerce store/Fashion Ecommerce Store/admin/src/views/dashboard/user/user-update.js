import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../../components/Card';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import img from '../../../assets/images/uplod.png'
import axiosInstance from '../../../js/api';


const UserUpdate = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user_id = searchParams.get('id');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    profile_image: '',
    mobile: '',
    gender: '',
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
        const response = await axiosInstance.get(`/get-users-profile?id=${user_id}`);
        const userData = response.data.data[0];
        const userAddress = userData.address || ''

        if (userData) {
          setFormData((prevData) => ({
            ...prevData,
            first_name: userData.first_name,
            last_name: userData.last_name,
            mobile: userData.mobile,
            email: userData.email,
            gender: userData.gender,
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
  }, [user_id]);

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
      const response = await axiosInstance.post("/update-profile-user", {
        id: user_id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        mobile: formData.mobile,
        gender: formData.gender,
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
    <div className='margintop'>
      <Col xl='12' lg='12'>
        <Row>
          <div className='col-12'>
            <Card>
              <Card.Body>
                <div className="header-title d-none d-md-block">
                  <h4 className="card-title">User Update</h4>
                </div>
                <div className='new-user-info'>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={4} className='text-center mt-3'>
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
                          <Col md={6}>
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
                          <Col md={6}>
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
                          <Col md={6}>
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
                          <Col md={6}>
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
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label htmlFor="gender">Gender:</Form.Label>
                              <Form.Select
                                id="gender"
                                name='gender'
                                value={formData.gender}
                                onChange={handleChange}
                              >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
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
                          <Col md={6}>
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
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label htmlFor="city">City:</Form.Label>
                              <Form.Control
                                type="text"
                                id="city"
                                name='city'
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter State"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
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
                          <Col md={6}>
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
                          <Col md={6}>
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
                          <Col md={12}>
                            <Button type="submit" className="btn btn-primary">
                              Update
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </Col>
      <ToastContainer />
    </div>
  );
};

export default UserUpdate;
