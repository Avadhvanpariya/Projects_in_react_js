import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import axiosInstance from '../../../js/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useLocation } from 'react-router-dom'

const UserAdd = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [userDetails, setUserDetails] = useState({
    full_name: '',
    mobile: '',
    email: '',
  });

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`/get-users-profile?id=${id}`);
        if (response.data.status === 200) {
          setUserDetails(response.data.data[0]);
        } else {
          console.error('Error fetching user details:', response.data.data.message);
          toast.error('Error fetching user details: ' + response.data.data.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Error fetching user details: ' + error.message);
      }
    };

    const fetchAllOrders = async () => {
      try {
        const response = await axiosInstance.get('/get-order');
        if (response.data.status === 200) {
          const userOrders = response.data.data.filter(order => order.user_id === id);
          setOrders(userOrders);
        } else {
          console.error('Error fetching all orders:', response.data.message);
          toast.error('Error fetching all orders: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error fetching all orders:', error);
        toast.error('Error fetching all orders: ' + error.message);
      }
    };

    if (id) {
      fetchUserDetails();
      fetchAllOrders();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleUpdateUser = async () => {
    try {
      userDetails.id = id;
      const response = await axiosInstance.post(`/update-profile-user`, userDetails);
      if (response.data.status === 200) {
        toast.success('User details updated successfully');
      } else {
        console.error('Error updating user details:', response.data.message);
        toast.error('Error updating user details: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error('Error updating user details: ' + error.message);
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
                  <h4 className="card-title">User Details</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="new-user-info">
                  <form>
                    <div className="row">
                      <div className="col-4 text-center">
                        {userDetails.img_url ? (
                          <img src={userDetails.img_url} alt='user img' width={'80%'} height={'300px'} />
                        ) : (
                          <h4>Image not found</h4>
                        )}
                      </div>
                      <div className="col-7">
                        <div className="row">
                          <Form.Group className="col-md-12 form-group">
                            <Form.Label htmlFor="fname">Full Name:</Form.Label>
                            <Form.Control
                              type="text"
                              id="fname"
                              placeholder="Divyesh Baraiya"
                              name="full_name"
                              value={userDetails.full_name}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-12 form-group">
                            <Form.Label htmlFor="mobno">
                              Mobile Number:
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="mobno"
                              placeholder="7486873619"
                              name="mobile"
                              value={userDetails.mobile}
                              onChange={handleChange}
                            />
                          </Form.Group>
                          <Form.Group className="col-md-12 form-group">
                            <Form.Label htmlFor="email">Email:</Form.Label>
                            <Form.Control
                              type="email"
                              id="email"
                              placeholder="divyeshbaraiya@gmail.com"
                              name="email"
                              value={userDetails.email}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </div>
                        <Button
                          type="button"
                          variant="btn btn-primary"
                          className="mt-2"
                          onClick={handleUpdateUser}
                        >
                          Update User Details
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl="12" lg="12">
            <div
              style={{
                padding: '10px',
                fontSize: '20px',
                background: '#5571ff',
                borderRadius: '6px',
                color: '#000',
                fontWeight: '600',
                textAlign: 'center',
                marginBottom: '26px',
              }}
            >
              User Order
            </div>
            <div className="row">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <div className="col-6" key={index}>
                    <Card>
                      <Card.Body>
                        <h4 className="mb-2">{index + 1}.</h4>
                        <div className="row">
                          <div className="col-7">
                            <p className="mb-1">
                              <b>Name :</b> {order.name}
                            </p>
                            <p className="mb-1">
                              <b>Person :</b> {order.persons}
                            </p>
                            <p className="mb-1">
                              <b>Access :</b> {order.access}
                            </p>
                            <p className="mb-1">
                              <b>Time :</b> {order.bookDate[0]} to {order.bookDate[1]}
                            </p>
                          </div>
                          <div className="col-5">
                            <div>
                              <img src={order.qr_img_url} alt="" className="img-fluid" />
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <h4>No Orders Found.</h4>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default UserAdd
