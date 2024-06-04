import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../../components/Card';
import axiosInstance from '../../../js/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';

const PicnicOrderAdd = () => {
   const [orderDetails, setOrderDetails] = useState({
      party_name: '',
      mobile: '',
      picnic_date: '',
      total_persons: '',
      package: '',
      adult: '',
      kids: '',
   });

   const [isLoading, setIsLoading] = useState(false);

   const handleCreateOrder = async () => {
      try {
         setIsLoading(true);
         const response = await axiosInstance.post('/create-picnic-order', orderDetails);

         if (response.data.status === 200) {
            toast.success('Picnic Order created successfully');
            // Optionally, you can clear the form after successful creation
            setOrderDetails({
               party_name: '',
               mobile: '',
               picnic_date: '',
               total_persons: '',
               package: '',
               adult: '',
               kids: '',
            });
         } else {
            toast.error('Error creating Picnic order: ' + response.data.message);
         }
      } catch (error) {
         toast.error('Error creating Picnic order: ' + error.message);
      } finally {
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
                           <h4 className="card-title">Picnic Details</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        <div className="new-user-info">
                           <form>
                              <div className="row">
                                 <div className="col-md-9">
                                    <div className="row">
                                       <Form.Group className="col-md-6  form-group">
                                          <Form.Label htmlFor="party_name">Party Name:</Form.Label>
                                          <Form.Control
                                             type="text"
                                             id="party_name"
                                             name="party_name"
                                             value={orderDetails.party_name}
                                             onChange={(e) => setOrderDetails({ ...orderDetails, party_name: e.target.value })}
                                          />
                                       </Form.Group>
                                       <Form.Group className="col-md-6  form-group">
                                          <Form.Label htmlFor="mobile">Mobile:</Form.Label>
                                          <Form.Control
                                             type="text"
                                             id="mobile"
                                             name="mobile"
                                             value={orderDetails.mobile}
                                             onChange={(e) => setOrderDetails({ ...orderDetails, mobile: e.target.value })}
                                          />
                                       </Form.Group>
                                       <Form.Group className="col-md-6  form-group">
                                          <Form.Label htmlFor="picnic_date">Picnic Date:</Form.Label>
                                          <Form.Control
                                             type="date"
                                             id="picnic_date"
                                             name="picnic_date"
                                             value={orderDetails.picnic_date}
                                             onChange={(e) => setOrderDetails({ ...orderDetails, picnic_date: e.target.value })}
                                          />
                                       </Form.Group>
                                       <Form.Group className="col-md-6 form-group">
                                          <Form.Label htmlFor="total_person">Total Person:</Form.Label>
                                          <Form.Control
                                             type="text"
                                             id="total_person"
                                             name="total_person"
                                             placeholder="Enter total_person"
                                             value={orderDetails.total_persons}
                                             onChange={(e) => setOrderDetails({ ...orderDetails, total_persons: e.target.value })}
                                          />
                                       </Form.Group>
                                       <Form.Group className="col-md-6 form-group">
                                          <Form.Label htmlFor="adult">Adult :</Form.Label>
                                          <Form.Control
                                             type="text"
                                             id="adult"
                                             name="adult"
                                             placeholder="Enter Adults"
                                             value={orderDetails.adult}
                                             onChange={(e) => setOrderDetails({ ...orderDetails, adult: e.target.value })}
                                          />
                                       </Form.Group>
                                       <Form.Group className="col-md-6 form-group">
                                          <Form.Label htmlFor="kids">Kids :</Form.Label>
                                          <Form.Control
                                             type="text"
                                             id="kids"
                                             name="kids"
                                             placeholder="Enter Kids"
                                             value={orderDetails.kids}
                                             onChange={(e) => setOrderDetails({ ...orderDetails, kids: e.target.value })}
                                          />
                                       </Form.Group>
                                       <Form.Group className="col-md-12 form-group">
                                          <Form.Label htmlFor="package">Package:</Form.Label>
                                          <select
                                             name="package"
                                             value={orderDetails.package}
                                             className="selectpicker form-control"
                                             data-style="py-0"
                                             onChange={(e) => setOrderDetails({ ...orderDetails, package: e.target.value })}
                                          >
                                             <option value="Breakfast, Lunch & Hi-Tea">Breakfast, Lunch & Hi-Tea</option>
                                             <option value="Breakfast + Lunch">Breakfast + Lunch</option>
                                             <option value="Hi Tea + Dinner">Hi Tea + Dinner</option>
                                             <option value="Food & Night Stay">Food & Night Stay</option>
                                          </select>
                                       </Form.Group>
                                    </div>
                                    <Button type="button" variant="btn btn-primary" className="mt-2" onClick={handleCreateOrder}>
                                       Create Picnic Order
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
                                 marginTop: '800px',
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

export default PicnicOrderAdd;
