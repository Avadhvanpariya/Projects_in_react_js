import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../../components/Card';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from '../../../assets/images/orderview.png';
import axiosInstance from '../../../js/api';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";


const Paymentview = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState([]);
    const [orderItem, setOrderItem] = useState([]);
    const [productItem, setProductItem] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const order_id = searchParams.get('id');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/get-order?id=${order_id}`);
                setOrders(response.data.data);
                setUser(response.data.data.user);
                setOrderItem(response.data.data.order_item);
                const product_id = response.data.data.order_item.product_id
                fetchProductData(product_id);
            } catch (error) {
                console.error('Error fetching order data:', error);
                toast.error('Error fetching order data');
            }
        };

        fetchData();
    }, []);

    const fetchProductData = async (product_id) => {
        try {
            const response = await axiosInstance.get(`/get-product?id=${product_id}`);
            setProductItem(response.data.data);
        } catch (error) {
            console.error('Error fetching order data:', error);
            toast.error('Error fetching order data');
        }
    };

    return (
        <div className='margintop'>
            <div className='row mt-20'>
                <Col xl="8" lg="8">
                    <Col>
                        <Card>
                            <Card.Body>
                                <div className='d-flex justify-content-between'>
                                    <p style={{ background: 'rgba(180, 254, 210, 0.85)', borderRadius: '6px', padding: '2px 15px', fontSize: '15px' }}>Fulfilled</p>
                                    <p>{new Date(orders.updatedAt).toLocaleDateString()}</p>
                                </div>
                                <Row className='mt-15'>
                                    <div className='col-md-4'>
                                        <img src={img} alt='order' className='w-100' />
                                    </div>
                                    <div className='col-md-8 mt-15 px-30'>
                                        <h4 className='orderview-title mb-2'>{productItem.name}</h4>
                                        <p style={{ fontSize: '13px', color: '#0067FF' }}>( SKU ID- {orderItem.product_id} )</p>
                                        <div className='mt-3 orderview-text'>
                                            <p className='mt-5'>Color: Red</p>
                                            <p className='mt-5'>Size: M</p>
                                            <p className='mt-5'>Qty: {orderItem.quantity}</p>
                                        </div>
                                        <h6 className='mt-30 orderview-price'>₹ {orders.amount}</h6>
                                    </div>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <div className='d-flex justify-content-between'>
                                    <p style={{ background: '#f0f0f0', borderRadius: '6px', padding: '2px 15px', fontSize: '15px' }}>Paid</p>
                                </div>
                                <div className='mt-3' style={{ border: '2px solid #DFDFDF', borderRadius: '6px' }}>
                                    <Row className='mt-15 px-20'>
                                        <div className='col-4'>
                                            <p className='orderview-tabel-text'>Subtotal</p>
                                            <p className='orderview-tabel-text' style={{ color: '#000' }}>Total</p>
                                        </div>
                                        <div className='col-4'>
                                            <p className='orderview-tabel-text'>{orderItem.quantity} item</p>
                                            <p className='orderview-tabel-text'></p>
                                        </div>
                                        <div className='col-4' style={{ textAlign: 'end' }}>
                                            <p className='orderview-tabel-price'>{orders.amount}</p>
                                            <p className='orderview-tabel-price' style={{ color: '#000' }}>₹ {orders.amount}</p>
                                        </div>
                                        <hr style={{ color: '#747474' }} />
                                        <div className='col-4'>
                                            <p className='orderview-tabel-text' style={{ color: '#000' }}>Paid by customer</p>
                                        </div>
                                        <div className='col-4'>
                                            <p className='orderview-tabel-text'></p>
                                        </div>
                                        <div className='col-4' style={{ textAlign: 'end' }}>
                                            <p className='orderview-tabel-price' style={{ color: '#000' }}>₹ {orders.amount}</p>
                                        </div>
                                    </Row>
                                </div>
                                {/* <div>
                                    <button
                                        className="btn btn-md btn-primary px-3 mt-2 mb-lg-0 mb-2 mr-10 "
                                        style={{ fontWeight: '600' }}
                                    >
                                        Confirm
                                    </button>
                                </div> */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Col>
                <Col xl="4" lg="4">
                    <Card>
                        <Card.Body>
                            <div>
                                <h6 className='customer-details'>Customer :-</h6>
                                <div className='customer-name mt-15'>
                                    <p>{user.name}</p>
                                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#6A6A6A' }}>Order 1</span>
                                </div>
                                <h6 className='customer-details mt-40'>Contact Info :-</h6>
                                <div className='customer-name mt-15'>
                                    <p className='mb-10'>demo123@gmail.com</p>
                                    <p style={{ fontFamily: "Red Hat Mono" }}>+91 {user.mobile}</p>
                                </div>
                                <h6 className='customer-details mt-40'>Shipping address :-</h6>
                                <div className='customer-name mt-15'>
                                    <p className='mb-10'>{user.address + ',' + user.city + ',' + user.state + ',' + user.pincode}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
            {/* <Col sm="12">
                <div>
                    <div className='header-title' style={{ textAlign: 'end' }}>
                        <button
                            className="btn btn-md btn-danger"
                        >
                            <span className="btn-inner">
                                <svg
                                    width="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                    <path
                                        d="M20.708 6.23975H3.75"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                    <path
                                        d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                                Delete
                            </span>
                        </button>
                    </div>
                </div>
            </Col> */}
            {/* <Col sm="12">
                <section className="mt-50">
                    <MDBContainer className="py-5 h-100">
                        <MDBRow className="justify-content-center align-items-center">
                            <MDBCol size="12">
                                <MDBCard
                                    className="card-stepper text-black"
                                    style={{ borderRadius: "16px" }}
                                >
                                    <MDBCardBody className="p-5">
                                        <div className="d-flex justify-content-between align-items-center mb-5">
                                            <div>
                                                <MDBTypography tag="h5" className="mb-0">
                                                    INVOICE{" "}
                                                    <span className="text-primary font-weight-bold">
                                                        #Y34XDHR
                                                    </span>
                                                </MDBTypography>
                                            </div>
                                            <div className="text-end">
                                                <p className="mb-0">
                                                    Expected Arrival <span>01/12/19</span>
                                                </p>
                                                <p className="mb-0">
                                                    USPS{" "}
                                                    <span className="font-weight-bold">
                                                        234094567242423422898
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <ul
                                            id="progressbar-2"
                                            className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                                        >
                                            <li className="step0 active text-center" id="step1"></li>
                                            <li className="step0 active text-center" id="step2"></li>
                                            <li className="step0 active text-center" id="step3"></li>
                                        </ul>

                                        <div className="d-flex justify-content-between">
                                            <div className="d-lg-flex align-items-center">
                                                <MDBIcon fas icon="clipboard-list me-lg-4 mb-3 mb-lg-0" size="3x" />
                                                <div>
                                                    <p className="fw-bold mb-1">Order</p>
                                                    <p className="fw-bold mb-0">Placed</p>
                                                </div>
                                            </div>
                                            <div className="d-lg-flex align-items-center">
                                                <MDBIcon fas icon="shipping-fast me-lg-4 mb-3 mb-lg-0" size="3x" />
                                                <div>
                                                    <p className="fw-bold mb-1">Order</p>
                                                    <p className="fw-bold mb-0">Dispatched</p>
                                                </div>
                                            </div>
                                            <div className="d-lg-flex align-items-center">
                                                <MDBIcon fas icon="home me-lg-4 mb-3 mb-lg-0" size="3x" />
                                                <div>
                                                    <p className="fw-bold mb-1">Order</p>
                                                    <p className="fw-bold mb-0">Delivered</p>
                                                </div>
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </Col> */}
        </div>
    );
};

export default Paymentview;
