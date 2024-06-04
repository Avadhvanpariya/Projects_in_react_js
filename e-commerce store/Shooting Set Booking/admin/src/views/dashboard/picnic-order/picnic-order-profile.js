
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../js/api';
import { Link, useLocation } from 'react-router-dom'


const OrderView = () => {
  const [orderDetails, setOrderDetails] = useState({
    id: '',
    party_name: '',
    mobile: '',
    picnic_date: '',
    total_persons: '',
    package: '',
    adult: '',
    kids: '',
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/get-picnic-order?id=${id}`);
        if (response.data.status === 200) {
          setOrderDetails(response.data.data[0]);
        } else {
          toast.error('Error fetching order details: ' + response.data.message);
        }
      } catch (error) {
        toast.error('Error fetching order details: ' + error.message);
      }
    };
    fetchData();
  }, [id]);


  return (
    <>
      <div>
        <Row>
          <Col xl="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Picnic Order Details</h4>
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
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6  form-group">
                            <Form.Label htmlFor="mobile">Mobile:</Form.Label>
                            <Form.Control
                              type="text"
                              id="mobile"
                              name="mobile"
                              value={orderDetails.mobile}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6  form-group">
                            <Form.Label htmlFor="picnic_date">Picnic Date:</Form.Label>
                            <Form.Control
                              type="date"
                              id="picnic_date"
                              name="picnic_date"
                              value={orderDetails.picnic_date}
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
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="package">Package :</Form.Label>
                            <Form.Control
                              type="text"
                              id="package"
                              name="package"
                              value={orderDetails.package}
                            />
                          </Form.Group>
                        </div>
                        <div className="col-md-6 form-group">
                          <Link to="/dashboard/picnic-list" className='btn-primary btn'>
                            Go Back
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default OrderView
