import React, { useState, useEffect } from "react";
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import axiosInstance, { paymentAxiosInstance } from '../../js/api';
import img from '../../assets/images/image.png'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import LabelStepper from "./stepper";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import './style.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function CheckoutForm(props) {
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [step, setStep] = useState(2);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginPopupVisible, setLoginPopupVisible] = useState(false);
    const [userName, setUserName] = useState("");
    const [productData, setProductData] = useState([]);
    const [formData, setFormData] = React.useState({
        mobileNumber: '',
        firstName: '',
        lastName: '',
        address: '',
        pincode: '',
        gender: '',
        city: '',
        state: '',
        country: 'INDIA',
        addressType: 'home',
    });
    const [showAddressForm, setShowAddressForm] = useState(true);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        if (!formData) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill in all the required details.',
            });
            return;
        }

        const emptyFields = Object.keys(formData).filter(key => !formData[key]);

        if (emptyFields.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: `Please fill in all the required details. The following fields are empty: <br>${emptyFields.join(', ')}`,
            });
            return;
        }
        setStep(3)
        setShowAddressForm(false);
        setShowPaymentForm(true);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const transactionId = searchParams.get('transactionId');

        if (transactionId) {
            const checkPaymentStatus = async () => {
                try {
                    setIsLoading(true);
                    const response = await paymentAxiosInstance.get(`/get-payment-status?transactionId=${transactionId}`);

                    if (response.data.message === 'Payment success') {
                        window.location.href = '/order-detail';
                    } else if (response.data.message === 'COD Successfully') {
                        window.location.href = '/order-detail';
                    } else if (response.data.message === 'Order already successful') {
                        window.location.href = '/order-detail';
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

            return () => {
                // if (!isLoading) {
                //     createAbandonedCheckout();
                // }
            };
        }
    }, []);


    useEffect(() => {
        const checkUserAndLoadData = async () => {
            try {
                const response = await axiosInstance.get('/get-profile');
                const userData = response.data.data;

                if (userData) {
                    setUserName(userData);
                    const localCartData = JSON.parse(localStorage.getItem('localCart')) || [];

                    if (localCartData.length > 0) {
                        for (const cartItem of localCartData) {
                            await axiosInstance.post("/add-to-cart", cartItem);
                        }
                        checkUserAndLoadData()
                        localStorage.removeItem('localCart');
                    }

                    const cartData = userData.cart;
                    setProductData(cartData);
                    if (userData.address) {
                        setFormData((prevData) => ({
                            ...prevData,
                            mobileNumber: userData.mobile,
                            firstName: userData.first_name,
                            lastName: userData.last_name,
                            gender: userData.gender,
                            address: userData.address.address_line_1,
                            pincode: userData.address.pin_code,
                            city: userData.address.city,
                            state: userData.address.state,
                            country: userData.address.country,
                        }));
                    }
                }
            } catch (error) {
                console.error('Error getting user data:', error);

                const localCartData = JSON.parse(localStorage.getItem('localCart')) || [];
                setProductData(localCartData);
            } finally {
                setIsLoading(false);
            }
        };

        checkUserAndLoadData();
    }, []);


    const calculateTotalAmount = () => {
        let total = 0;
        for (const product of productData) {
            total += Number(product.price);
        }
        return total.toString();
    };


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    function generateTransactionId() {
        const randomString = Math.random().toString(36).substring(2, 15);

        const timestamp = new Date().getTime();
        const transactionId = `TXN${randomString}${timestamp}`;

        return transactionId;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await paymentAxiosInstance.post("/create-payment", {
                transactionId: generateTransactionId(),
                products: productData,
                amount: calculateTotalAmount(),
                name: formData.firstName + formData.lastName,
                email: userName.email,
                mobile: formData.mobileNumber,
                gender: formData.gender,
                address: formData.address,
                city: formData.city,
                method: paymentMethod,
                state: formData.state,
                pincode: formData.pincode,
                country: formData.country
            });
            if (response && response.data.data.redirectUrl) {
                window.location.href = response.data.data.redirectUrl;
            } else if (response && response.data.data.method == 'COD') {
                window.location.href = `/check-out?transactionId=${response.data.data.transactionId}`
            } else {
                toast.error('Error: Redirect URL not provided.');
            }
        } catch (error) {
            toast.error('Error submitting payment. Please try again later.');
            console.error('Error submitting payment:', error);
        }
    };

    const createAbandonedCheckout = async () => {
        try {
            const cart = {
                cart: productData
            }
            const response = await axiosInstance.post("/create-abandoned-checkout", cart);
        } catch (error) {
            console.error('Error creating abandoned checkout:', error);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        try {
            const response = await axiosInstance.post("/login-user", { email, password });
            const token = response.data.data.authorization;

            localStorage.setItem("authorization", token);
            setLoginPopupVisible(false);
            toast.success("Login successful", { position: "top-right", className: 'custom-toast' });
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Login failed. Please check your details.", {
                position: "top-right",
                className: 'custom-toast'
            });
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const goToAddressForm = () => {
        setStep(2)
        setShowAddressForm(true);
        setShowPaymentForm(false);
    };

    return (
        <>
            <LabelStepper step={step} />
            <div className='checkout-page-container pb-5'>
                {isLoading && <div style={{ position: 'fixed', top: '0%', left: '0%', background: '#00000094', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '999' }}>
                    <div className="payment-loader">
                        <div className="pad">
                            <div className="chip"></div>
                            <div className="line line1"></div>
                            <div className="line line2"></div>
                        </div>
                        <div className="loader-text">
                            PROCESSING YOUR ORDER
                        </div>
                    </div>
                </div>}
                <div>
                    <div className='d-flex mt-4'>
                        <h2 className='checkout-heading'>
                            <i>Checkout</i>
                        </h2>
                        <p className='item-head'>| {productData.length || 0} item</p>
                    </div>
                </div>
                <div className='row'>
                    {showAddressForm && (
                        <div className='col-md-7' id="address-div">
                            <div className="mt-4">
                                <p className='checkoutform-start-text'>Enter Shipping Address</p>
                                <Form className='mt-md-3' onSubmit={handleAddressSubmit}>
                                    <div className='row'>
                                        <div className='col-6 p-2'>
                                            <Form.Label htmlFor="FullName" className='checkout-fromlabel'>First name*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="FullName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                aria-describedby="FullName"
                                                placeholder='Enter first name'
                                                className='checkout-fromfiled'
                                            />
                                        </div>
                                        <div className='col-6 p-2'>
                                            <Form.Label htmlFor="FullName" className='checkout-fromlabel'>Last name*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder='Enter last name'
                                                className='checkout-fromfiled'
                                            />
                                        </div>
                                        <div className='col-12 p-2'>
                                            <Form.Label htmlFor="FullName" className='checkout-fromlabel'>Mobile number*</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="mobileNumber"
                                                value={formData.mobileNumber}
                                                onChange={handleChange}
                                                placeholder='Enter Mobile number*'
                                                className='checkout-fromfiled'
                                            />
                                        </div>
                                        <div class='col-12 p-2'>
                                            <label for="gender" class='checkout-fromlabel'>Gender*</label>
                                            <select id="gender" aria-describedby="gender"
                                                value={formData.gender}
                                                name="gender"
                                                onChange={handleChange} class='checkout-fromfiled form-select'>
                                                <option>Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className='col-12 p-2'>
                                            <Form.Label htmlFor="FullName" className='checkout-fromlabel'>Address*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                aria-describedby="FullName"
                                                placeholder='Address*'
                                                className='checkout-fromfiled'
                                            />
                                        </div>
                                        <div className='col-12 p-2'>
                                            <Form.Label htmlFor="FullName" className='checkout-fromlabel'>Pincode*</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                                placeholder='Pincode*'
                                                className='checkout-fromfiled'
                                            />
                                        </div>
                                        <div className='col-6 p-2'>
                                            <Form.Label htmlFor="FullName" className='checkout-fromlabel'>City*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder='City*'
                                                className='checkout-fromfiled'
                                            />
                                        </div>
                                        <div className='col-6 p-2'>
                                            <Form.Label htmlFor="FullName" className='checkout-fromlabel'>State*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                placeholder='Enter state'
                                                className='checkout-fromfiled'
                                            />
                                        </div>
                                        <div className='col-12 p-2'>
                                            <Form.Label htmlFor="country" className='checkout-fromlabel'>Country</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                placeholder='Enter Country'
                                                className='checkout-fromfiled'
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-4'>
                                        <p className='mb-0' style={{ fontSize: '13px' }}>By Signing In, I agree to the Terms of Use and Privacy Policy</p>
                                        <Button type="submit" className="add-to-cart checkout-button mt-0">Next</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                    {showPaymentForm && (
                        <div className='col-md-7' id="payment-div">
                            <div className="payment-method-selection mt-4">
                                <p className='checkoutform-start-text'><a onClick={goToAddressForm} className="mt-3" style={{ cursor: 'pointer' }}><ArrowBackIosNewIcon style={{ fontSize: '18px' }} /> </a>Select Payment Method</p>
                                <div style={{ marginLeft: '25px' }}>
                                    <RadioGroup
                                        aria-label="payment-method"
                                        name="payment-method"
                                        value={paymentMethod}
                                        onChange={handlePaymentMethodChange}
                                    >
                                        <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery (COD)" />
                                        <FormControlLabel value="Prepaid" control={<Radio />} label="Prepaid" />
                                    </RadioGroup>
                                </div>
                                <Button onClick={localStorage.getItem('authorization') ? handleSubmit : () => setLoginPopupVisible(true)} className="add-to-cart checkout-button mt-3">Confirm Payment</Button>
                            </div>
                        </div>
                    )}
                    <div className="col-md-4 p-2 px-md-3">
                        <div className="">
                            <div className="mb-4">
                                <h3 className="mycart-summary">ORDER SUMMARY</h3>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="mycart-summary-details">Subtotal</p>
                                <p className="mycart-summary-details">₹{calculateTotalAmount()}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="mycart-summary-details">Charges</p>
                                <p className="mycart-summary-details">FREE</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="mycart-summary-details"><strong>Order Total</strong></p>
                                <p className="mycart-summary-details"><strong>₹{calculateTotalAmount()}</strong></p>
                            </div>
                            <div className="add-to-cart"> &nbsp;&nbsp;&nbsp;View cart Items</div>
                            <div className="row mt-3">
                                {productData.map(product => (
                                    <div className="row" key={product.product_id}>
                                        <div className="col-md-4 col-3">
                                            <img src={(product.product_images) ? product.product_images : img} className="product-cart-image img-fluid" alt="product" />
                                        </div>
                                        <div className="col-md-8 col-7 px-4">
                                            <h4 className="checkout-mini-heading">{product.name}</h4>
                                            <p className="checkout-mini-heading mb-1 mt-2">Color: {product.color}</p>
                                            <p className="checkout-mini-heading mb-1">Size: {product.size}</p>
                                            <p className="checkout-mini-heading">Qty: {product.quantity}</p>
                                            <div className="d-flex">
                                                <p className="addtocart-price">₹{product.price}</p>
                                            </div>
                                        </div>
                                        <hr style={{ color: '#00646D', height: '2px', margin: '10px 0px' }} />
                                    </div>
                                ))}
                            </div>
                            <hr style={{ color: '#00646D', height: '2px' }} />
                            <div className="text-center">
                                <div className="d-flex justify-content-between">
                                    <div className="m-auto ">
                                        <div className="addtocart-circle">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                <path d="M8.125 5L3.75 8.75L8.125 13.125" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M3.75 8.75H18.1213C22.4231 8.75 26.0763 12.2625 26.2438 16.5625C26.4213 21.1063 22.6669 25 18.1213 25H7.49875" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="addtocart-circle-text">Easy<br />
                                            Returns</p>
                                    </div>
                                    <div className="m-auto">
                                        <div className="addtocart-circle ml-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                <path d="M5 20H20V22.5H5V20ZM2.5 13.75H15V16.25H2.5V13.75Z" fill="white" />
                                                <path d="M37.3989 20.7575L33.6489 12.0075C33.5527 11.7826 33.3925 11.5909 33.1883 11.4563C32.9841 11.3216 32.7448 11.2499 32.5002 11.25H28.7502V8.75C28.7502 8.41848 28.6185 8.10054 28.3841 7.86612C28.1496 7.6317 27.8317 7.5 27.5002 7.5H7.50017V10H26.2502V25.695C25.6806 26.0257 25.1821 26.466 24.7835 26.9903C24.3849 27.5146 24.094 28.1127 23.9277 28.75H16.0727C15.7684 27.5717 15.0449 26.5448 14.0377 25.8617C13.0304 25.1787 11.8087 24.8865 10.6014 25.0399C9.39416 25.1932 8.28426 25.7816 7.47977 26.6947C6.67529 27.6078 6.23145 28.783 6.23145 30C6.23145 31.217 6.67529 32.3922 7.47977 33.3053C8.28426 34.2184 9.39416 34.8068 10.6014 34.9602C11.8087 35.1135 13.0304 34.8213 14.0377 34.1383C15.0449 33.4552 15.7684 32.4283 16.0727 31.25H23.9277C24.1996 32.3228 24.8215 33.2743 25.6949 33.954C26.5683 34.6336 27.6435 35.0027 28.7502 35.0027C29.8569 35.0027 30.932 34.6336 31.8055 33.954C32.6789 33.2743 33.3008 32.3228 33.5727 31.25H36.2502C36.5817 31.25 36.8996 31.1183 37.1341 30.8839C37.3685 30.6495 37.5002 30.3315 37.5002 30V21.25C37.5002 21.0807 37.4658 20.9131 37.3989 20.7575ZM11.2502 32.5C10.7557 32.5 10.2724 32.3534 9.86125 32.0787C9.45013 31.804 9.1297 31.4135 8.94048 30.9567C8.75126 30.4999 8.70175 29.9972 8.79821 29.5123C8.89467 29.0273 9.13278 28.5819 9.48241 28.2322C9.83204 27.8826 10.2775 27.6445 10.7624 27.548C11.2474 27.4516 11.7501 27.5011 12.2069 27.6903C12.6637 27.8795 13.0541 28.2 13.3289 28.6111C13.6036 29.0222 13.7502 29.5055 13.7502 30C13.7495 30.6628 13.4859 31.2983 13.0172 31.767C12.5485 32.2357 11.913 32.4993 11.2502 32.5ZM28.7502 13.75H31.6752L34.3552 20H28.7502V13.75ZM28.7502 32.5C28.2557 32.5 27.7724 32.3534 27.3613 32.0787C26.9501 31.804 26.6297 31.4135 26.4405 30.9567C26.2513 30.4999 26.2018 29.9972 26.2982 29.5123C26.3947 29.0273 26.6328 28.5819 26.9824 28.2322C27.332 27.8826 27.7775 27.6445 28.2625 27.548C28.7474 27.4516 29.2501 27.5011 29.7069 27.6903C30.1637 27.8795 30.5541 28.2 30.8289 28.6111C31.1036 29.0222 31.2502 29.5055 31.2502 30C31.2495 30.6628 30.9859 31.2983 30.5172 31.767C30.0485 32.2357 29.413 32.4993 28.7502 32.5ZM35.0002 28.75H33.5727C33.2973 27.6793 32.6745 26.7302 31.8017 26.0516C30.929 25.3729 29.8557 25.0031 28.7502 25V22.5H35.0002V28.75Z" fill="white" />
                                            </svg>
                                        </div>
                                        <p className="addtocart-circle-text">Free<br /> shipping</p>
                                    </div>
                                    <div className="m-auto">
                                        <div className="addtocart-circle">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="43" height="40" viewBox="0 0 43 40" fill="none">
                                                <path d="M2.6875 32.5C2.6875 32.8315 2.82907 33.1495 3.08108 33.3839C3.33308 33.6183 3.67487 33.75 4.03125 33.75H38.9688C39.3251 33.75 39.6669 33.6183 39.9189 33.3839C40.1709 33.1495 40.3125 32.8315 40.3125 32.5V17.3438H2.6875V32.5ZM8.23047 21.7188C8.23047 21.553 8.30126 21.394 8.42726 21.2768C8.55326 21.1596 8.72415 21.0938 8.90234 21.0938H16.6289C16.8071 21.0938 16.978 21.1596 17.104 21.2768C17.23 21.394 17.3008 21.553 17.3008 21.7188V26.7188C17.3008 26.8845 17.23 27.0435 17.104 27.1607C16.978 27.2779 16.8071 27.3438 16.6289 27.3438H8.90234C8.72415 27.3438 8.55326 27.2779 8.42726 27.1607C8.30126 27.0435 8.23047 26.8845 8.23047 26.7188V21.7188ZM38.9688 6.25H4.03125C3.67487 6.25 3.33308 6.3817 3.08108 6.61612C2.82907 6.85054 2.6875 7.16848 2.6875 7.5V12.6562H40.3125V7.5C40.3125 7.16848 40.1709 6.85054 39.9189 6.61612C39.6669 6.3817 39.3251 6.25 38.9688 6.25Z" fill="white" />
                                            </svg>
                                        </div>
                                        <p className="addtocart-circle-text">Secure<br />
                                            payments</p>
                                    </div>
                                </div>
                                <hr style={{ color: '#00646D', height: '2px' }} />
                                <p><LocalPostOfficeIcon /> support@rajrachna.com</p>
                                <hr style={{ color: '#00646D', height: '2px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={loginPopupVisible}
                onHide={() => setLoginPopupVisible(false)}
            >
                <Modal.Body className="login-popup" style={{ background: 'linear-gradient(90deg, #074044 16%, #021114 119.2%)' }}>
                    <div className="">
                        <div className="mt-2 mb-4 mb-md-4 text-white">
                            <h4 style={{ fontSize: '25px' }}>Login/Sign Up</h4>
                        </div>
                        <Form onSubmit={handleSignIn}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label className="text-white">Email address</Form.Label>
                                <Form.Control type="email" value={email} onChange={handleEmailChange} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword" style={{ position: 'relative' }}>
                                <Form.Label className="text-white">Password</Form.Label>
                                <div className="password-input">
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        style={{ height: 'calc(2.25rem + 10px)', borderRadius: '10px' }}
                                    />
                                    <div className="password-toggle" onClick={handleTogglePassword} style={{ position: 'absolute', right: '15px', fontSize: '20px', bottom: '10px' }}>
                                        {showPassword ? <BsEyeSlash /> : <BsEye />}
                                    </div>
                                </div>
                            </Form.Group>
                            <Button className="mt-3 login-button" style={{ backgroundColor: '#000', borderColor: '#ffe8be' }} type="submit">Submit</Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </>
    );
}
