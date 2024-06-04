import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import Card from '../../../components/Card'
import img from '../../../assets/images/frame 1.png'

const UserAdd = () => {
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
                    <div className="row">
                      <div className="col-3 text-center">
                        <img src={img} alt="" className="img-fluid" />
                        <input
                          type="file"
                          className="mt-3"
                          style={{ fontSize: '15px' }}
                        />
                      </div>
                      <div className="col-9">
                        <div className="row">
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="fname">Name:</Form.Label>
                            <Form.Control
                              type="text"
                              id="fname"
                              placeholder="Divyesh Baraiya"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6  form-group">
                            <Form.Label htmlFor="mobno">Mobile:</Form.Label>
                            <Form.Control
                              type="text"
                              id="mobno"
                              placeholder="7486873619"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6  form-group">
                            <Form.Label htmlFor="email">Email:</Form.Label>
                            <Form.Control
                              type="email"
                              id="email"
                              placeholder="divyeshbaraiya@gmail.com"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">Book Date:</Form.Label>
                            <Form.Control
                              type="text"
                              id="pass"
                              placeholder="15/10/2023"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">Days:</Form.Label>
                            <Form.Control
                              type="text"
                              id="pass"
                              placeholder="2 Days"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">Person:</Form.Label>
                            <Form.Control
                              type="text"
                              id="pass"
                              placeholder="2 Adults , 1 Kid"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">Payment:</Form.Label>
                            <Form.Control
                              type="text"
                              id="pass"
                              placeholder="Done"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <Form.Label htmlFor="pass">Method:</Form.Label>
                            <Form.Control
                              type="text"
                              id="pass"
                              placeholder="Online"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-12 form-group">
                            <Form.Label htmlFor="pass">Access:</Form.Label>
                            <Form.Control
                              type="text"
                              id="pass"
                              placeholder="Resort and Shooting area , Prewedding"
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

export default UserAdd
