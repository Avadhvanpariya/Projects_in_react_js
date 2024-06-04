
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../js/api';
import { useLocation } from 'react-router-dom'


const OrderView = () => {
  const [scanningDetails, setScanningDetails] = useState({
    id: '',
    name: '',
    bookDate: '',
    days: '',
    access: '',
    scan_time_date: ''
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/get-scan-data?id=${id}`);
        if (response.data.status === 200) {
          setScanningDetails(response.data.data[0]);
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
                  <h4 className="card-title">Scanning Details</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="col-md-9">
                        <div className="row">
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="name">Name:</Form.Label>
                            <Form.Control
                              type="text"
                              id="name"
                              value={scanningDetails.name}
                              placeholder="Demo"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">Book Date:</Form.Label>
                            <Form.Control
                              type="text"
                              value={scanningDetails.bookDate}
                              id="pass"
                              placeholder="demo"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">Days:</Form.Label>
                            <Form.Control
                              type="text"
                              value={scanningDetails.days}
                              id="pass"
                              placeholder="enter days"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">Entry Time:</Form.Label>
                            <Form.Control
                              type="text"
                              value={scanningDetails.scan_time_date}
                              id="pass"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-12 form-group">
                            <Form.Label htmlFor="pass">Access:</Form.Label>
                            <Form.Control
                              type="text"
                              value={scanningDetails.access}
                              id="pass"
                              placeholder="Full Day"
                            />
                          </Form.Group>
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
