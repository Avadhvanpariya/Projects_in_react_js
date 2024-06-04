import React, { useState, useEffect } from "react";
import axiosInstance from '../../js/api';
import notfound from '../../assets/Empty-pana.png'
import { Link } from "react-router-dom";

function OrderDetailPage() {
    const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [userName, setUserName] = useState("");
    const [orderData, setOrderData] = useState([]);

    const getUserData = async () => {
        try {
            const response = await axiosInstance.get('/get-profile');
            const userData = response.data.data;
            setUserName(userData);
        } catch (error) {
            console.error('Error in getUserData:', error);
        }
    };

    const getOrderData = async () => {
        try {
            const response = await axiosInstance.get('/get-order');
            const order = response.data.data;
            setOrderData(order);
        } catch (error) {
            console.error('Error in getUserData:', error);
        }
    };

    useEffect(() => {
        getUserData();
        getOrderData();
    }, []);

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    return (
        <>
            {orderData.length === 0 ? (
                <div className="text-center mt-5 mb-5">
                    <img src={notfound} alt="Not Found" style={{ width: '350px', height: '350px' }} />
                    <p>No Product Found</p>
                    <p>Go and add products to your cart.</p>
                    <Link to="/product-list" className="btn add-to-cart w-25">Go to Shop</Link>
                </div>
            ) : (
                <div>
                    <div className="account-header pt-4">
                        <div className="container">
                            <div class="d-flex flex-column justify-content-between">
                                <h5 class="page-title" style={{ color: '#074044' }}>MY ACCOUNT</h5>
                                <h1 class="page-heading">Hii,
                                    {userName.first_name + ' ' + userName.last_name}</h1>
                                <p class="profile-description">From My Account , you have the ability to view your recent account activities and update your account information.</p>
                            </div>
                        </div>
                    </div>
                    <div className="py-5">
                        <div className="container">
                            {orderData.map(order => (
                                <div key={order._id} className="row border p-4 mt-4">
                                    <div className="col-12 p-2 order-details1">
                                        <p>Ordered On {new Date(order.createdAt).toLocaleDateString()} | Receipt ID: {order.transaction_id}</p>
                                        <h3>Delivered {new Date(order.updatedAt).toLocaleDateString()}</h3>
                                    </div>
                                    <div className="col-md-3 text-center">
                                        {order.order_items.length > 0 && order.order_items[0].product_img && (
                                            <img src={order.order_items[0].product_img} alt="" className="img-fluid" />
                                        )}
                                    </div>
                                    <div className="col-md-9 px-3">
                                        {order.order_items.length > 0 && (
                                            <div>
                                                <div className="col-12 p-2 order-details1">
                                                    <h4 style={{ fontFamily: 'monospace' }}>{order.order_items[0].product_name}</h4>
                                                    <p className="mb-2">Color: {order.order_items[0].color}</p>
                                                    <p className="mb-2">Size: {order.order_items[0].size}</p>
                                                    <p className="mb-2">Quantity: {order.order_items[0].quantity}</p>
                                                    <div className="order-details1-price mb-2">
                                                        <h4>Total:- ₹{order.amount}/-</h4>
                                                    </div>
                                                    <h6 className="mb-2 mt-4">Delivery Address :-</h6>
                                                    <p className="mb-2 text-dark" style={{ fontFamily: 'sans-serif', fontWeight: '600' }}>{order.user.address + ' ' + order.user.city + ' ' + order.user.state + ' ' + order.user.pincode}</p>

                                                    <h6 className="mb-2 mt-4">Tracking ID/Link :-</h6>
                                                    <p className="mb-2 text-dark" style={{ fontFamily: 'sans-serif', fontWeight: '600' }}>{order.tracking_link}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-12">
                                        <h5 className="mb-2 mt-3">Order Tracking :-</h5>
                                        <div className="row meal mt-3">
                                            {['PLACED', 'DISPATCHED', 'DELIVERED'].map(statusType => {
                                                const status = order.delivery_status.find(deliveryStatus => deliveryStatus.shipment_status === statusType);
                                                return (
                                                    <div
                                                        key={statusType}
                                                        className={`order-tracking ${status ? `${status.shipment_status.toLowerCase()} completed` : ''}`}
                                                    >
                                                        <span className="is-complete"></span>
                                                        <p style={{ fontWeight: '600' }} className="mb-0">{statusType}</p>
                                                        {status && <p className="mt-0" style={{ fontFamily: '600' }}>{new Date(status.updatedAt).toLocaleDateString()}</p>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default OrderDetailPage
