import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../js/api';
import Swal from 'sweetalert2';

function ContactForm() {
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setContactData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!contactData.name || !contactData.email || !contactData.mobile || !contactData.message) {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            await axiosInstance.post('/create-inquiry', {
                name: contactData.name,
                email: contactData.email,
                mobile: contactData.mobile,
                message: contactData.message,
            });

            setContactData({
                name: '',
                email: '',
                mobile: '',
                message: '',
            });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Feedback added successfully!',
            });
        } catch (error) {
            console.error('Error creating Feedback:', error);
            toast.error('Error creating Feedback. Please try again.');

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error creating Feedback. Please try again.',
            });
        }
    };

    return (
        <>
            <section className="map_sec">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="map_inner">
                                <h4>Find Us on Google Map</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quo beatae quasi assumenda, expedita aliquam minima tenetur maiores neque incidunt repellat aut voluptas hic dolorem sequi ab porro, quia error.</p>
                                <div className="map_bind">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.4889499246124!2d72.82841737471827!3d21.17272688281931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e3ef5a45b3d%3A0xc1687cfb81116386!2sJay%20Hanuman%20Estate!5e0!3m2!1sen!2sin!4v1707386859878!5m2!1sen!2sin" width="100%" height="450" frameBorder="0" style={{ border: '0' }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="py-5">
                <div className="container">
                    <div className="text-center">
                        <h2>Get In Touch With Us</h2>
                        <p className="sub-heading mb-3">For More Information About Our Product & Services. Please Feel Free To Drop Us <br />An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
                    </div>
                    <div className="mt-5">
                        <div className="row justify-content-center">
                            <div className='col-md-6'>
                                <div className='px-md-3'>
                                    <iframe src="https://www.google.com/maps/embed?pb=!4v1709736304266!6m8!1m7!1sCAoSLEFGMVFpcFBCLUlRYmF4azMwZFRTMzA2M0N4aHdua3ZPdGJiZElta1BGaExI!2m2!1d21.171380776644!2d72.831409133996!3f359.0300620952373!4f27.76017704504423!5f0.7820865974627469" width="100%" height="550" className='map2' style={{ border: '0', borderRadius: '15px' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <form onSubmit={handleSubmit} className='mt-4'>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label form-label2">Your name</label>
                                        <input type="text" className="form-control py-2" onChange={handleChange} name='name' id="name" placeholder="Your name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label form-label2">Email address</label>
                                        <input type="email" className="form-control py-2" onChange={handleChange} name='email' id="email" placeholder="Email address" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="mobile" className="form-label form-label2">Mobile</label>
                                        <input type="number" className="form-control py-2" onChange={handleChange} name='mobile' id="mobile" placeholder="mobile" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label form-label2">Message</label>
                                        <textarea className="form-control py-2" onChange={handleChange} name='message' id="message" rows="4" placeholder="Message"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactForm;
