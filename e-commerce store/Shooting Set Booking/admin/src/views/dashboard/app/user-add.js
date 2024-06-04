import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../../components/Card';
import axiosInstance from '../../../js/api';
import './styles.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserAdd = () => {
   const [formData, setFormData] = useState({
      full_name: '',
      mobile: '',
      email: '',
      password: '',
   });

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.id]: e.target.value,
      });
   };

   const [isLoading, setIsLoading] = useState(false);
   const handleSubmit = async () => {
      try {
         setIsLoading(true);
         const response = await axiosInstance.post('/add-user', formData);
         if (response.data.status === 200) {
            setTimeout(() => {
               toast.success('User added successfully');
               setIsLoading(false);
            }, 1000);
         } else {
            console.error('Error creating user:', response.data.message);
            toast.error('Error creating user: ' + response.data.message);
            setIsLoading(false);
         }
      } catch (error) {
         console.error('Error creating user:', error);
         toast.error('Error creating user: ' + error.message);
         setIsLoading(false);
      }
   };

   return (
      <>
         <div>
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
                           <form>
                              <div className="row">
                                 <div className="col-10">
                                    <div className="row">
                                       <Form.Group className="col-md-6 form-group">
                                          <Form.Label htmlFor="full_name">Full Name:</Form.Label>
                                          <Form.Control
                                             type="text"
                                             id="full_name"
                                             placeholder="Full Name"
                                             value={formData.full_name}
                                             onChange={handleChange}
                                          />
                                       </Form.Group>
                                       <Form.Group className="col-md-6 form-group">
                                          <Form.Label htmlFor="mobile">Mobile Number:</Form.Label>
                                          <Form.Control
                                             type="text"
                                             id="mobile"
                                             placeholder="Mobile Number"
                                             value={formData.mobile}
                                             onChange={handleChange}
                                          />
                                       </Form.Group>
                                       <Form.Group className="col-md-6 form-group">
                                          <Form.Label htmlFor="email">Email:</Form.Label>
                                          <Form.Control
                                             type="email"
                                             id="email"
                                             placeholder="Email"
                                             value={formData.email}
                                             onChange={handleChange}
                                          />
                                       </Form.Group>
                                       <Form.Group className="col-md-6 form-group">
                                          <Form.Label htmlFor="password">Password:</Form.Label>
                                          <Form.Control
                                             type="password"
                                             id="password"
                                             placeholder="Password"
                                             value={formData.password}
                                             onChange={handleChange}
                                          />
                                       </Form.Group>
                                    </div>
                                    <Button type="button" variant="primary" className="mt-3" onClick={handleSubmit}>
                                       Add User
                                    </Button>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </Card.Body>
                  </Card>
                  {isLoading && (
                     <>
                        {/* Desktop Spinner */}
                        <div className="d-none d-md-block">
                           <div
                              style={{
                                 position: 'absolute',
                                 top: 0,
                                 left: 0,
                                 width: '100%',
                                 height: '100%',
                                 background: 'rgba(255, 255, 255, 0.8)',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                              }}
                           >
                              <Spinner animation="border" variant="primary" />
                           </div>
                        </div>

                        {/* Mobile Spinner */}
                        <div className="d-md-none">
                           <div
                              style={{
                                 position: 'absolute',
                                 top: 0,
                                 left: 0,
                                 width: '100%',
                                 height: '100%',
                                 background: 'rgba(255, 255, 255, 0.8)',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 marginTop: '200px',
                              }}
                           >
                              <Spinner animation="border" variant="primary" />
                           </div>
                        </div>
                     </>
                  )}
               </Col>
            </Row>
         </div>
      </>
   );
};

export default UserAdd;
