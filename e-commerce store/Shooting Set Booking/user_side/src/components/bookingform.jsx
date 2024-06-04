import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import axiosInstance, { paymentAxiosInstance } from '../js/api';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function BookingForm(props) {
    const [orderDetails, setOrderDetails] = useState({
        user_id: '',
        name: '',
        email: '',
        mobile: '',
        days: '',
        total_persons: '',
        total_amount: '',
        photographer_names: '',
        photographer_mobile: '',
        checkInDate: new Date(),
        checkOutDate: new Date(),
        access: '',
        qr_img_url: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Ensure that the value is a valid date string
        const isDateInput = name === 'checkInDate' || name === 'checkOutDate';
        const dateValue = isDateInput ? new Date(value) : value;

        setOrderDetails((prevOrderDetails) => ({
            ...prevOrderDetails,
            [name]: dateValue,
        }));
    };


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axiosInstance.get('/get-user-profile');
                if (response.data.status === 200) {
                    const adminDetails = response.data.data;
                    setOrderDetails({
                        user_id: adminDetails._id
                    });
                } else {
                    toast.error(`Failed to fetch user details: ${response.data.message}`);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    function generateTransactionId() {
        const randomString = Math.random().toString(10).substring(2, 10)

        const timestamp = new Date().getTime();
        const transactionId = `TXN${randomString}${timestamp}`;

        return transactionId;
    }

    const renderAmount = () => {
        switch (orderDetails.access) {
            case 'Full Day time 07 am to  8pm':
                return 17000;
            case 'Half Day 07am to 1pm and 2pm to 9pm':
                return 10000;
            case 'Hourly 2:30 hour':
                return 5000;
            default:
                return 0;
        }
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const bookDate = [format(orderDetails.checkInDate, 'dd/MM/yyyy'), format(orderDetails.checkOutDate, 'dd/MM/yyyy')];

            const qrResponse = await axiosInstance.post('/create-qr', { ...orderDetails, bookDate, });
            if (qrResponse.data.status === 200) {
                const qrCodeUrl = qrResponse.data.data.qrCodeUrl;

                setOrderDetails((prevOrderDetails) => ({
                    ...prevOrderDetails,
                    qr_img_url: qrCodeUrl,
                }));

                const orderResponse = await paymentAxiosInstance.post('/create-payment', { ...orderDetails, bookDate, qr_img_url: qrCodeUrl, transactionId: generateTransactionId(), total_amount: renderAmount() });
                console.log('Payment Create:', orderResponse.data);

                if (orderResponse && orderResponse.data.data.redirectUrl) {
                    window.location.href = orderResponse.data.data.redirectUrl;
                } else {
                    toast.error('Error: Redirect URL not provided.');
                }

                props.onHide();
            } else {
                console.error('Error creating QR code:', qrResponse.data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error Creating QR Code',
                    text: 'An error occurred while creating the QR code. Please try again.',
                });
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error Submitting Order',
                text: 'An error occurred while submitting your order. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="closebutton" />
            <Modal.Body>
                <div className="">
                    <div className="modal-content">
                        {isLoading && (
                            <div
                                style={{
                                    position: 'fixed',
                                    top: '0%',
                                    left: '0%',
                                    background: '#00000094',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: '999',
                                }}
                            >
                            </div>
                        )}
                        <div className="modal-body">
                            <h3 className="title mb-5">Book Now</h3>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label>Full name :-</label>
                                    <input type="Name" name="name" className="form-control" placeholder="Enter Name" onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Email ID :-</label>
                                    <input type="Email" name="email" className="form-control" placeholder="Enter Email" onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label>Mobile :-</label>
                                    <input type="Email" name="mobile" className="form-control" placeholder="Enter Mobile No." onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Total Days :-</label>
                                    <input type="text" name="days" className="form-control" placeholder="Enter Total Days of Staying" onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label>Photographer Name :-</label>
                                    <input type="Email" name="photographer_names" className="form-control" placeholder="Enter Photographer Name" onChange={handleInputChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Photographer Mobile :-</label>
                                    <input type="text" name="photographer_mobile" className="form-control" placeholder="Enter PhotoGrapher Mobile No." onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <label>Total Persons :-</label>
                                    <input type="text" name="total_persons" className="form-control" placeholder="Enter Person kid and adults" onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 pr-1">
                                    <div className="form-group">
                                        <label>Check in date :-</label>
                                        <input type="date" name="checkInDate" className="form-control" placeholder="Enter Check in date" onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="col-6 pl-0">
                                    <div className="form-group">
                                        <label>Check in out :-</label>
                                        <input type="date" name="checkOutDate" className="form-control" placeholder="Enter Check in date" onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Select Access :-</label>
                                <select
                                    className="form-control"
                                    value={orderDetails.access}
                                    onChange={(e) => setOrderDetails({ ...orderDetails, access: e.target.value })}
                                >
                                    <option hidden>Select Access Options</option>
                                    <option value="Full Day time 07 am to  8pm">Full Day time 07 am to  8pm</option>
                                    <option value="Half Day 07am to 1pm and 2pm to 9pm">Half Day 07am to 1pm and 2pm to 9pm</option>
                                    <option value="Hourly 2:30 hour">Hourly 2:30 hour</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <div className="form-group">
                                    <label>Price :-</label>
                                    <input type="text" name="total_amount" className="form-control" onChange={handleInputChange} value={renderAmount()} />
                                </div>
                            </div>
                            <button className="btn mt-2" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default BookingForm;