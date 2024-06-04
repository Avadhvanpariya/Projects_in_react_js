import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../../components/Card';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import img from '../../../assets/images/uplod.png'
import axiosInstance from '../../../js/api';


const AdminProfile = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    mobile: '',
    email: '',
    admin_profile: '',
    selectedFile: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/get-profile');
        const adminData = response.data.data;
        setFormData((prevData) => ({
          ...prevData,
          full_name: adminData.full_name,
          mobile: adminData.mobile,
          email: adminData.email,
          admin_profile: adminData.admin_profile
        }));
      } catch (error) {
        console.error('Error fetching admin details:', error);
        toast.error('Error fetching admin details');
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
          admin_profile: uploadedImageUrl,
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
      const response = await axiosInstance.post("/update-profile", {
        full_name: formData.full_name,
        mobile: formData.mobile,
        email: formData.email,
        admin_profile: formData.admin_profile,
      });

      toast.success('Admin details updated successfully', { autoClose: 2000 });
    } catch (error) {
      console.error('Error updating admin details:', error);
      toast.error('Error updating admin details');
    }
  };

  return (
    <div className='margintop'>
      <Col xl='12' lg='12'>
        <Row>
          <div className='col-12'>
            <Card>
              <Card.Body>
                <div className='new-user-info'>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={4} className='text-center mt-3'>
                        <img alt='Photos' src={formData.admin_profile || img} style={{ borderRadius: '8px', width: '100%' }} />
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
                          <Col md={12}>
                            <Form.Group className="mb-3">
                              <Form.Label htmlFor="full_name">Full Name:</Form.Label>
                              <Form.Control
                                type="text"
                                id="full_name"
                                name='full_name'
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="Enter First Name"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={12}>
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
                          <Col md={12}>
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

export default AdminProfile;
