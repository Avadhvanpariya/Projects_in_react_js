import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axiosInstance from '../../js/api';
import { toast } from 'react-toastify';
import { Footer } from '../FooterStyle/footer';
import Header from '../HeaderStyle/secondheader';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row } from "react-bootstrap";
import Swal from 'sweetalert2';


function VideoShopping() {
    const [productData, setProductData] = useState([]);
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: '',
        slot: '',
        slot_time: ''
    });

    useEffect(() => {
        const getProductData = async () => {
            try {
                const response = await axiosInstance.post('/get-products');
                console.log(response.data.data);
                setProductData(response.data.data);
            } catch (error) {
                console.error('Error fetching product data:', error);
                toast.error('Error fetching product data');
            }
        };

        getProductData()
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setContactData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(contactData)
        if (!contactData.name || !contactData.email || !contactData.mobile || !contactData.message) {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            await axiosInstance.post('/book-video-call', {
                name: contactData.name,
                email: contactData.email,
                mobile: contactData.mobile,
                message: contactData.message,
                slot: contactData.slot,
                slot_time: contactData.slot_time
            });

            setContactData({
                name: '',
                email: '',
                mobile: '',
                message: '',
                slot: '',
                slot_time: ''
            });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Video Call Booked successfully! our team contact you soon.',
            });
        } catch (error) {
            console.error('Error Video Call not Booked:', error);
            toast.error('Error Video Call not Booked. Please try again.');

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error Video Call not Booked. Please try again.',
            });
        }
    };

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const today = new Date().toISOString().split('T')[0];
    return (
        <>
            <Header />
            {/* <div className="pb-2 pt-5">
                <div className="container">
                    <div className="text-center">
                        <h2>Special Collection</h2>
                    </div>
                    <div className=" mt-3">
                        <Slider {...settings}>
                            {productData.map(product => (
                                <div key={product.id}>
                                    <div className="m-2">
                                        <div>
                                            <img src={product.product_images[0]} alt="product" width='100%' />
                                        </div>
                                        <Link className="" to={`/product-view?product_id=${product._id}`}>
                                            <div className="mt-2 mb-0">
                                                <p className="product-card-details text-black">{product.name}</p>
                                                <p className="product-card-price mt-3 text-black" >₹ {product.price}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div >
            </div > */}
            <div className="py-5">
                <div className="container">
                    <div className="text-center">
                        <h2>BOOK APPOINTMENT FOR VIDEO CALL SHOPPING</h2>

                        <h3 className="mt-4">Appointment Time:</h3>
                        <h3>Mon to Sun - 7:00am to 1:00am </h3>

                        <div className="mt-5">
                            <div className="col-md-8 col-12 m-auto">
                                <form onSubmit={handleSubmit}>
                                    <Row>
                                        <div className="col-12">
                                            <FloatingLabel
                                                controlId="name"
                                                label="Full Name"
                                                className="mb-3 px-1"
                                            >
                                                <Form.Control type="Name" onChange={handleChange} name='name' placeholder="Enter Name" />
                                            </FloatingLabel>
                                        </div>
                                        <div className="col-12">
                                            <FloatingLabel controlId="email" label="Enter Email" className="mb-3 px-1">
                                                <Form.Control type="email" onChange={handleChange} name='email' placeholder="Enter Email" />
                                            </FloatingLabel>
                                        </div>
                                        <div className="col-6">
                                            <FloatingLabel controlId="mobile" label="Enter Mobile" className="mb-3 px-1">
                                                <Form.Control type="number" onChange={handleChange} name='mobile' placeholder="Enter Mobile" />
                                            </FloatingLabel>
                                        </div>
                                        <div className="col-6">
                                            <FloatingLabel controlId="slot" label="Select date" className="mb-3 px-1">
                                                <Form.Control type="date" placeholder="Select date" min={today} onChange={handleChange} name='slot' />
                                            </FloatingLabel>
                                        </div>
                                        <div className="col-12">
                                            <FloatingLabel controlId="slot_time" label="Select Time" className="mb-3 px-1">
                                                <Form.Select onChange={handleChange} name='slot_time'>
                                                    <option hidden>Select Time</option>
                                                    <option value="11:30 AM IST">11:30 AM IST</option>
                                                    <option value="12:00 PM IST">12:00 PM IST</option>
                                                    <option value="12:30 PM IST">12:30 PM IST</option>
                                                    <option value="01:00 PM IST">01:00 PM IST</option>
                                                    <option value="01:30 PM IST">01:30 PM IST</option>
                                                    <option value="02:00 PM IST">02:00 PM IST</option>
                                                    <option value="02:30 PM IST">02:30 PM IST</option>
                                                    <option value="03:00 PM IST">03:00 PM IST</option>
                                                    <option value="03:30 PM IST">03:30 PM IST</option>
                                                    <option value="04:00 PM IST">04:00 PM IST</option>
                                                    <option value="04:30 PM IST">04:30 PM IST</option>
                                                    <option value="05:00 PM IST">05:00 PM IST</option>
                                                    <option value="05:30 PM IST">05:30 PM IST</option>
                                                    <option value="06:00 PM IST">06:00 PM IST</option>
                                                    <option value="06:30 PM IST">06:30 PM IST</option>
                                                    <option value="07:00 PM IST">07:00 PM IST</option>
                                                    <option value="07:30 PM IST">07:30 PM IST</option>
                                                    <option value="08:00 PM IST">08:00 PM IST</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </div>
                                        <div className="col-12">
                                            <FloatingLabel controlId="message" label="Product Requirement">
                                                <Form.Control
                                                    as="textarea"
                                                    placeholder="Leave a comment here"
                                                    style={{ height: '100px' }}
                                                    onChange={handleChange}
                                                    name='message'
                                                />
                                            </FloatingLabel>
                                        </div>
                                    </Row>
                                    <button type="submit" className="btn btn-submit mt-3">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="seo_text">
                <div class="container">
                    <p dir="ltr">Shopping only gets better and better when it comes to Raj Rachana fashion Online services to bring maximum trust to our shoppers across the Globe. Here’s your chance to TRY Risk-free Online Video Shopping Experience with Raj Rachana Video Shopping service.</p>

                    <p dir="ltr">What if you can get 100% Surity of Online Shopping products? while sitting away from India and shop from any locations to get the View of products on personal Live Video Chat as per your requirements? Well all that is now possible with Raj Rachana Video Shopping Service from Surat’s Largest Indian Wear Megastore Raj RachanaPlus Store.</p>

                    <p dir="ltr">Raj Rachana Plus Store Surat has been Offering this unique service of Video Call Shopping since 2010 to bring customer satisfaction and solve the problems of online website shopping. The Video shopping service involves easy shopping experience with expertise services for customers all over the world to sit back at their own Locations and shop on Real time from our Real Store through Video Chat. Start Live Shopping with Us on Skype, Facetime, Google Duo, or Facebook Messenger.</p>

                    <p dir="ltr">Our Video Shopping service will give you access to all product categories in our retail store Raj Rachana Ghoddod Rd Sutaria Surat which is a well known Mega Mall Store in Gujarat. We specialise in Indian Ethnic Wear and give you the choices to choose from Latest and Exclusive Premium Designer Collection at Raj Rachana by just a simple Video Calling Service.</p>

                    <h2 dir="ltr">Shop for Bridal Wear or Grooms Wear on Video Call Site</h2>

                    <p dir="ltr">Our range of Premium bridal wear and Exclusive Grooms Wear is now easy to Shop on Live Video Shopping by our service. You can now choose your wedding wear with a Virtual Live shipping experience and order online for genuine products.</p>

                    <p dir="ltr">Now you can drive away fears of online shopping on websites for heavy or expensive products by choosing this option of Live video chat shopping with Raj Rachana Plus. No more worries on what will be product color, quality or size when it comes to this service as you get to see product on Video Call before confirming order and are already assured on what you will get when you shop for premium Indian ethnic wear from us.</p>

                    <h2 dir="ltr">Shop for Designer Wear Indian Fashion with Raj Rachana Video Shopping</h2>

                    <p dir="ltr">Fashion keeps changing and everyone wants to buy something that’s still in trend. Our service is directly connected to our Raj Rachana Store, hence makes it easy for fast dispatch, choose from ready to ship products and also get to choose from every week new arrivals for weddings, festivals or party wear products.</p>

                    <p dir="ltr">Shop online mens indian wear on video call or shop for kids Indian wear on video shopping service to shop on your suitable timings with a personal shopper to assist you on your live experience from our store. Raj Rachana Online video call shopping is available all over the world with Fast Delivery Services to Most Countries too.</p>

                    <h2 dir="ltr">Pros of Raj Rachana Video Calling Shopping Service</h2>

                    <ul>
                        <li dir="ltr">
                            <p dir="ltr">Shop for Expensive or Premium Collection on Video Call to Get maximum trust of product without even walking into our store!</p>
                        </li>
                        <li dir="ltr">
                            <p dir="ltr">Get Alteration services for products bought with us, we also provide Custom Tailoring for orders that need stitching as per your customised needs.</p>
                        </li>
                        <li dir="ltr">
                            <p dir="ltr">Choose from New arrivals from over 25000 products at our store of Indian ethnic wear, which are also from Ready to Ship Collection for Fast Dispatch and Express Delivery.</p>
                        </li>
                        <li dir="ltr">
                            <p dir="ltr">Worldwide Shipping services with great offers and deals for our customers to shop for Wedding wear, Party wear, Festive wear or even casual wear.</p>
                        </li>
                        <li dir="ltr">
                            <p dir="ltr">Easy Returns and Refund Policy of Raj Rachana Video Shopping Service. We also provide free pick up of returns to some countries. See our Policy for more information on returns pick up.</p>
                        </li>
                    </ul>

                    <p dir="ltr">We are the top choices for our Indian ethnic wear shopper from USA, UK, Australia, New Zealand, Canada, Mauritius, Malaysia, UAE, Singapore, South Africa, Peru, Kenya and many more countries. Check out our Happy Customer Feedback and &nbsp;Reviews of Video shopping service.</p>

                    <p dir="ltr"><br />
                        Now are you ready to Try this Unique FREE service of Easy Live Video Call Shopping Service by Raj Rachanaplus ? Book your Appointments to get yourself an unforgettable shopping experience.</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default VideoShopping;
