import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Card from '../../../components/Card';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from '../../../assets/images/orderview.png'
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../../js/api';
import CircularProgress from '@mui/material/CircularProgress';



const AbandonedView = () => {
    const [abandoned, setAbandoned] = useState([]);
    const [userAddress, setUserAddress] = useState([]);
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const abandoned_id = searchParams.get('id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/get-abandoned-checkout?id=${abandoned_id}`);
                const product_id = response.data.data?.cart[0].product_id
                const userData = response.data.data?.user
                const address = userData.address
                getProductData(product_id)
                setUserAddress(address);
                setAbandoned(response.data.data);
            } catch (error) {
                console.error('Error fetching Abandoned data:', error);
                toast.error('Error fetching Abandoned data');
            }
        };

        const getProductData = async (product_id) => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get(`/get-product?id=${product_id}`);
                setProductData(response.data.data)
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error fetching Abandoned data:', error);
                toast.error('Error fetching Abandoned data');
            }
        };


        fetchData();
    }, []);

    return (
        <div className='margintop'>
            <div className='row mt-20'>
                <Col xl="8" lg="8">
                    <Col>
                        <Card>
                            <Card.Body>
                                <div className='d-flex justify-content-between'>
                                    <p style={{ background: '#f0f0f0', borderRadius: '6px', padding: '2px 15px', fontSize: '15px' }}>Checkout details</p>
                                </div>
                                <div className='px-md-15'>
                                    <div className='mt-3' style={{ border: '2px solid #DFDFDF', borderRadius: '6px' }}>
                                        <div className='row p-3'>
                                            <div className='col-md-7 d-flex'>
                                                <img
                                                    src={productData.product_images && productData.product_images.length > 0 ? productData.product_images[0] : img}
                                                    alt='img'
                                                    className='mr-20'
                                                    style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                                                />
                                                <p style={{ fontSize: '17px', fontWeight: '600' }} className='mt-1'>{productData.name}</p>
                                            </div>
                                            <div className='col-md-3 mt-20' style={{ textAlign: 'end' }}>
                                                {abandoned.cart && abandoned.cart.length > 0 && (
                                                    <p>
                                                        ₹{productData.price} × {abandoned.cart[0].quantity}
                                                    </p>
                                                )}
                                            </div>
                                            <div className='col-md-2 mt-20' style={{ textAlign: 'end' }}>
                                                Total ₹{productData.price}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Row className='mt-15 px-md-20'>
                                    <div className='col-md-2 col-7'>
                                        <p className='orderview-tabel-text'>Subtotal</p>
                                        {/* <p className='orderview-tabel-text'>Tax</p> */}
                                        <p className='orderview-tabel-text' style={{ color: '#000' }}>Total</p>
                                    </div>
                                    <div className='col-6 d-none d-md-block' style={{ textAlign: 'start' }}>
                                        {abandoned.cart && abandoned.cart.length > 0 && (
                                            <p className='orderview-tabel-text'>
                                                ₹{productData.price} × {abandoned.cart[0].quantity}
                                                item</p>
                                        )}
                                        <p className='orderview-tabel-text'></p>
                                    </div>
                                    <div className='col-md-4 col-5' style={{ textAlign: 'end' }}>
                                        <p className='orderview-tabel-price'>₹{productData.price || '199'}</p>
                                        <p className='orderview-tabel-price' style={{ color: '#000' }}>₹{productData.price || '199'}</p>
                                    </div>
                                    <hr style={{ color: '#747474' }} />
                                    <div className='col-md-6 col-7'>
                                        <p className='orderview-tabel-text' style={{ color: '#000' }}>To be paid by customer</p>
                                    </div>
                                    <div className='col-md-6 col-5' style={{ textAlign: 'end' }}>
                                        <p className='orderview-tabel-price' style={{ color: '#000' }}>₹{productData.price || '199'}</p>
                                    </div>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Col>
                <Col xl="4" lg="4">
                    <Card>
                        <Card.Body>
                            <div>
                                <h6 className='customer-details'>Customer</h6>
                                <div className='customer-name mt-30'>
                                    <p>{abandoned.user?.first_name + ' ' + abandoned.user?.last_name || 'User'}</p>
                                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#6A6A6A' }}>Order {abandoned?.cart?.length || "0"}</span>
                                </div>
                                <h6 className='customer-details mt-40'>Contact Info</h6>
                                <div className='customer-name mt-25'>
                                    <p className='mb-10'>{abandoned.user?.email || "No Email Find"}</p>
                                    <p style={{ fontFamily: "Red Hat Mono" }}>+91 {abandoned.user?.mobile || "No Mobile Find"}</p>
                                </div>
                                <h6 className='customer-details mt-40'>Shipping address</h6>
                                <div className='customer-name mt-25'>
                                    <p className='mb-10'>{userAddress.address_line_1 + ' ' + userAddress.address_line_2 + ' ' + userAddress.city + ' ' + userAddress.state + ' ' + userAddress.pin_code || "No Mobile Find"}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
            {isLoading && <div style={{ position: 'fixed', top: '0%', left: '0%', background: '#00000094', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '999' }}>
                <CircularProgress sx={{ color: '#59acff', width: '60px!important', height: '60px!important' }} />
            </div>}
        </div>
    );
};

export default AbandonedView;
