import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../../components/Card';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../js/api';


const UserUpdate = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const inquiry_id = searchParams.get('id');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile_image: '',
    mobile: '',
    massages: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/get-inquiry?id=${inquiry_id}`);
        const inquiryData = response.data.data[0];

        if (inquiryData) {
          setFormData((prevData) => ({
            ...prevData,
            name: inquiryData.name,
            mobile: inquiryData.mobile,
            email: inquiryData.email,
            massages: inquiryData.massages,
          }));
        } else {
          console.error('Inquiry not found');
          toast.error('Inquiry not found');
        }
      } catch (error) {
        console.error('Error fetching Inquiry details:', error);
        toast.error('Error fetching Inquiry details');
      }
    };

    fetchData();
  }, [inquiry_id]);

  return (
    <div className='margintop'>
      <Col xl='12' lg='12'>
        <Row>
          <div className='col-12'>
            <Card>
              <Card.Body>
                <div className="header-title d-none d-md-block">
                  <h4 className="card-title">Inquiry View</h4>
                </div>
                <div className='new-user-info'>
                  <form>
                    <Row>
                      <Col md={12} className='mt-30'>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label htmlFor="name">Full Name:</Form.Label>
                              <Form.Control
                                type="text"
                                id="name"
                                name='name'
                                value={formData.name}
                                placeholder="Enter First Name"
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
                                placeholder="Enter Email"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label htmlFor="massages">Massages:</Form.Label>
                              <Form.Control
                                type="massages"
                                id="massages"
                                name='massages'
                                value={formData.massages}
                                placeholder="Enter massages"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <Link to={'/inquiry/list'} className="btn btn-primary">
                              Go Back
                            </Link>
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
