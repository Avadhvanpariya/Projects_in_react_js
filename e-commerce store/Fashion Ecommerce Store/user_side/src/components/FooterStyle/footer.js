import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import Logo from '../../assets/logo.png';
import { Image } from 'react-bootstrap';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Accordion from 'react-bootstrap/Accordion';
import footerhours from '../../assets/footerHorse.png';
import img from '../../assets/result.png'

export const Footer = () => {
    return (
        <MDBFooter style={{ background: 'linear-gradient(90deg, #074044 16%, #021114 119.2%)' }} className=' text-lg-start text-muted'>
            <section className='pt-1 footer'>
                <MDBContainer className=' text-md-start mt-5'>
                    <MDBRow className=''>
                        <MDBCol md='3' lg='4' xl='3' className='m-auto mb-4 text-center'>
                            <Image src={Logo} alt="First slide" width="150px" fluid />
                        </MDBCol>

                        <Accordion className='d-block d-md-none px-0'>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className='py-2'>Quick Links</Accordion.Header>
                                <Accordion.Body>
                                    <a href='/'><p>Home</p></a>
                                    <a href='/women'><p>Women</p></a>
                                    <a href='/product-list'><p>Shop</p></a>
                                    <a href='/contact-us'><p>Contact</p></a>
                                    <a href='/Blog'><p>Blog</p></a>
                                </Accordion.Body>
                            </Accordion.Item>
                            <hr style={{ color: '#fff', margin: 'auto' }} />
                            <Accordion.Item eventKey="1">
                                <Accordion.Header className='py-2'>Help</Accordion.Header>
                                <Accordion.Body>
                                    <a href='/shipping-details'><p>Shipping Details</p></a>
                                    <a href='/refund_policy'><p>Return and Refund Policy</p></a>
                                    <a href='/privacy_policy'><p>Privacy Policy</p></a>
                                    <a href='/terms-and-conditions'><p>Terms and conditions</p></a>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <hr style={{ color: '#fff' }} />
                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mt-3 mb-4 clr-white d-none d-md-block' style={{ color: '#fff' }}>
                            <h6 className='fw-bold mb-4'>Quick Links</h6>
                            <a href='/'><p>Home</p></a>
                            <a href='/women'><p>Women</p></a>
                            <a href='/product-list'><p>Shop</p></a>
                            <a href='/contact-us'><p>Contact</p></a>
                            <a href='/Blog'><p>Blog</p></a>
                        </MDBCol>

                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mt-3 mb-4 clr-white d-none d-md-block' style={{ color: '#fff' }}>
                            <h6 className=' fw-bold mb-4'>Help</h6>
                            <a href='/shipping-details'><p>Shipping Details</p></a>
                            <a href='/refund_policy'><p>Return and Refund Policy</p></a>
                            <a href='/privacy_policy'><p>Privacy Policy</p></a>
                            <a href='/terms-and-conditions'><p>Terms and conditions</p></a>
                        </MDBCol>

                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mt-3  mb-2 clr-white' style={{ color: '#fff' }}>
                            <h6 className='fw-bold mb-4'>Contact Us</h6>
                            <p>
                                <a href='#'>
                                    <LocationOnIcon />
                                    Jay Hanuman Estate, Plot no 41, near Hyundai Showroom, Laxmi Nagar, Udhana, Surat, Gujarat, 395017
                                </a>
                            </p>
                            <p>
                                <a href='#'>
                                    <EmailIcon />
                                    support@rajrachna.com
                                </a>
                            </p>
                            <p>
                                <a href='#'>
                                    <PhoneIcon />
                                    +91 9898173331
                                </a>
                            </p>
                            <h6 className='fw-bold mb-2 pt-4 pt-md-0'>Follow Us</h6>
                            <div className='d-flex justify-content-center mt-4 mt-md-0'>
                                <a href='https://www.facebook.com/profile.php?id=61554431170969&mibextid=kFxxJD' className='me-3 social-icon facebook'>
                                    <FacebookIcon />
                                </a>
                                <a href='https://www.instagram.com/rajrachnaofficial?igsh=cHB2NmFyNTdxeGh1' className='me-3 social-icon instagram'>
                                    <InstagramIcon />
                                </a>
                                <a href='https://pin.it/2ORLAwWsn' className='me-3 social-icon pintrest'>
                                    <PinterestIcon />
                                </a>
                                <a href='https://youtube.com/@Rajrachna?si=IsvOLNrVNMd7e-BO' className='me-3 social-icon youtube'>
                                    <YouTubeIcon />
                                </a>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className='container'>
                    <div className='container-fluid'>
                        <hr style={{ color: '#fff' }} />
                    </div>
                    <div className='d-md-flex justify-content-between pb-md-3'>
                        <div className='text-center pb-2' style={{ color: '#fff' }}>
                            © 2024 Copyright by Raj Rachana
                        </div>
                        <div className='text-center'>
                            <img src={img} alt='footer' />
                        </div>
                    </div>
                    <div className='text-center py-5  d-block d-md-none'>
                        <hr style={{ color: '#fff' }} />
                        <img src={footerhours} alt='footer' />
                    </div>
                </div>
            </section>
        </MDBFooter>
    );
};