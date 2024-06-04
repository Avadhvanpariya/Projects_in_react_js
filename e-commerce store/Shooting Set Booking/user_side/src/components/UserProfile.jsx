import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Col, Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import axiosInstance, { paymentAxiosInstance } from '../js/api';
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2';


const UserAdd = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams.get('transactionId');
  const [userDetails, setUserDetails] = useState({
    full_name: '',
    mobile: '',
    email: '',
    id: '',
    img_url: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const id = userDetails.id;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get('/get-user-profile');
        if (response.data.status === 200) {
          const adminDetails = response.data.data;
          setUserDetails({
            full_name: adminDetails.full_name,
            mobile: adminDetails.mobile,
            email: adminDetails.email,
            img_url: adminDetails.img_url,
            id: adminDetails._id,
          });
          setPreviewImage(adminDetails.img_url);
        } else {
          toast.error(`Failed to fetch user details: ${response.data.message}`);
        }
      } catch (error) {
        toast.error('Error fetching user details. Please try again later.');
        console.error('Error fetching user details:', error);
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

    const checkPaymentStatus = async () => {
      try {
        setIsLoading(true);
        const response = await paymentAxiosInstance.get(`/get-payment-status?transactionId=${transactionId}`);
        if (response.data.message === 'Payment success') {
          fetchAllOrders()
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Payment Not Received',
            text: 'Please contact our team for assistance.',
          });
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error checking payment status:', error);
      }
    };

    checkPaymentStatus();
    fetchUserDetails();
    if (id) {
      fetchAllOrders();
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserDetails({ ...userDetails, [id]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file);

      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateUser = async () => {
    try {
      let newImgUrl = userDetails.img_url;

      if (profileImage) {
        const formData = new FormData();
        formData.append('files', profileImage);

        const uploadResponse = await axiosInstance.post('/file-upload', formData);
        if (uploadResponse.data.status === 200) {
          newImgUrl = uploadResponse.data.data.fileURLs[0];
        } else {
          console.error('Error uploading image:', uploadResponse.data.message);
          toast.error('Error uploading image: ' + uploadResponse.data.message);
          return;
        }
      }
      console.log(newImgUrl)
      // Update user details with the new image URL
      const response = await axiosInstance.post(`/update-user-profile`, {
        ...userDetails,
        img_url: newImgUrl,
      });

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
      {isLoading && <div style={{ position: 'fixed', top: '0%', left: '0%', background: '#00000094', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '999' }}>
        <div className="payment-loader">
          <div className="pad">
            <div className="chip"></div>
            <div className="line line1"></div>
            <div className="line line2"></div>
          </div>
          <div className="loader-text">
            PROCESSING YOUR Booking
          </div>
        </div>
      </div>}
      <div className='flex h-[30vh] overflow-hidden relative bg-contact bg-cover'>
        <h2 className='flex  pt-5 text-3xl lg:text-8xl w-full text-white font-btnFont bg-gray-800/30 font-normal' style={{ justifyContent: 'center' }}>Profile</h2>
      </div>
      <div className='container mb-4'>
        <div className='text-start'>
          <Col xl="12" lg="12">
            <div className='py-4'>
              <form>
                <div className='col-12'>
                  <div className="new-user-info">
                    <div className="row m-auto">
                      <div className='col-md-3'>
                        <Form.Group className="mt-2 form-group  profile-image">
                          <div className='d-none d-md-block'>
                            {previewImage && (
                              <img
                                src={previewImage}
                                alt="Profile Preview"
                                className="mt-2 img-thumbnail"
                                style={{ maxWidth: '270px', }}
                              />
                            )}
                          </div>
                          <div className='d-block d-md-none'>
                            {previewImage && (
                              <img
                                src={previewImage}
                                alt="Profile Preview"
                                className="mt-2 img-thumbnail m-auto "
                                style={{ maxWidth: '270px' }}
                              />
                            )}
                          </div>
                        </Form.Group>
                      </div>
                      <div className='col-md-8 mt-4'>
                        <Form.Group className=" form-group mt-md-4" >
                          <Form.Label htmlFor="full_name">Full Name:</Form.Label>
                          <Form.Control
                            name="full_name"
                            type="text"
                            id="full_name"
                            placeholder="Enter Name"
                            value={userDetails.full_name}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mt-2 form-group">
                          <Form.Label htmlFor="mobile">
                            Mobile Number:
                          </Form.Label>
                          <Form.Control
                            name="mobile"
                            type="text"
                            id="mobile"
                            placeholder="Enter Mobile"
                            value={userDetails.mobile}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mt-2 form-group">
                          <Form.Label htmlFor="email">Email:</Form.Label>
                          <Form.Control
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group className="mt-2 form-group">
                          <Form.Label htmlFor="profileImage">Change Profile :</Form.Label>
                          <Form.Control
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            className='m-auto'
                          />
                        </Form.Group>
                        <Button
                          type="button"
                          variant="btn btn-primary"
                          className="mt-3"
                          onClick={handleUpdateUser}
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Col>
          <Col xl="12">
            <div
              style={{
                padding: '10px',
                fontSize: '20px',
                background: '#5571ff',
                borderRadius: '6px',
                color: '#fff',
                fontWeight: '600',
                marginBottom: '26px',
                textAlign: 'center',
                margin: '20px',
              }}
            >
              User Order
            </div>
            {/* desxtop view */}
            <div className='d-none d-md-block'>
              <div className="row px-2 ">
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <div className="col-md-6 col-12" key={index}>
                      <div className='card p-2 mb-2'>
                        <div className="row align-items-center">
                          <div className="col-md-7">
                            <h4 className="mb-2">{index + 1}.</h4>
                            <p className="mb-1">
                              <b>Name :</b> {order.name}
                            </p>
                            <p className="mb-1">
                              <b>Person :</b> {order.total_persons}
                            </p>
                            <p className="mb-1">
                              <b>Access :</b> {order.access}
                            </p>
                            <p className="mb-1">
                              <b>Time :</b> {order.bookDate[0]} to {order.bookDate[1]}
                            </p>
                          </div>
                          <div className="col-md-5">
                            <div>
                              <img src={order.qr_img_url} alt="" className="img-fluid" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-3">
                    <h4>No Orders Found.</h4>
                  </div>
                )}
              </div>
            </div>
            {/* Mobile view */}
            <div className='d-block d-md-none'>
              <div className="row">
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <div className="col-md-6 col-12" key={index}>
                      <div className='card p-2 mb-2'>
                        <div className="row align-items-center">
                          <div className="col-md-5">
                            <div>
                              <h4 className="mb-2">{index + 1}.</h4>
                              <img src={order.qr_img_url} alt="" className="img-fluid m-auto" />
                            </div>
                          </div>
                          <div className="col-md-7">

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

                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-3">
                    <h4>No Orders Found.</h4>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </div >
      </div >
    </>
  )
}

export default UserAdd
