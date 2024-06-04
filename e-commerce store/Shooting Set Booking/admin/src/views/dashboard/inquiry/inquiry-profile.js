
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
// import img from '../../../assets/images/frame 1.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../js/api';
import { Link, useLocation } from 'react-router-dom'


const InquiryView = () => {
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    mobno: '',
    email: '',
    bookDate: '',
    days: '',
    person: '',
    payment: '',
    method: '',
    access: '',
    qr_img_url: ''
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/get-inquiry?id=${id}`);
        console.log(response)
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
                  <h4 className="card-title">Order Details</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="new-user-info">
                  <form>
                    <div>
                      <div className="col-md-9">
                        <div className="row">
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="name">Name:</Form.Label>
                            <Form.Control
                              type="text"
                              id="name"
                              value={orderDetails.name}
                              placeholder="Demo"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6  form-group">
                            <Form.Label htmlFor="mobno">Mobile:</Form.Label>
                            <Form.Control
                              type="text"
                              id="mobno"
                              value={orderDetails.mobile}
                              placeholder="123456789"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6  form-group">
                            <Form.Label htmlFor="email">Email:</Form.Label>
                            <Form.Control
                              type="email"
                              id="email"
                              value={orderDetails.email}
                              placeholder="enter email"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">Massage:</Form.Label>
                            <Form.Control
                              type="text"
                              value={orderDetails.massages}
                              id="pass"
                              placeholder="demo"
                            />
                          </Form.Group>
                        </div>
                        <Link to="/dashboard/inquiry-list" className="btn btn-btn btn-primary">
                          GO Back
                        </Link>
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

export default InquiryView
