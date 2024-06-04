import React from "react";
import { Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../../assets/images/lion.png';
import img2 from '../../assets/images/high-quality.png';
import img3 from '../../assets/images/secure-payment.png';
import img4 from '../../assets/images/power.png';

function FeatureWrapper() {
    const settings = {
        infinite: true,
        dots: true,
        speed: 500,
        slidesToShow: 3,
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
    return (
        <>
            <div className="py-5 semifooter-bg margintop-blog">
                <div className="">
                    <div className="semifooter">
                        <div className="feature">
                            <Slider {...settings} arrows={false}>
                                <div className="col-md-3 col-6 text-center mb-md-0 mb-4">
                                    <img
                                        className="img-2 wrapper-img m-auto"
                                        alt="Trophy"
                                        src={img1}
                                        style={{ width: '19%' }}
                                    />
                                    <div className="mt-3">
                                        <div className="wrapper-heading">MADE IN INDIA</div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 text-center">
                                    <img
                                        className="img-2 wrapper-img m-auto"
                                        alt="Guarantee"
                                        src={img2}
                                        style={{ width: '19%' }}
                                    />
                                    <div className="mt-3">
                                        <div className="wrapper-heading">ASSURED QUALITY</div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 text-center">
                                    <img
                                        className="img-2 wrapper-img m-auto"
                                        alt="Shipping"
                                        src={img3}
                                        style={{ width: '19%' }}
                                    />
                                    <div className="mt-3">
                                        <div className="wrapper-heading">SECURE PAYMENTS</div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6 text-center">
                                    <img
                                        className="img-2 wrapper-img m-auto"
                                        alt="Customer support"
                                        src={img4}
                                        style={{ width: '19%' }}
                                    />
                                    <div className="mt-3">
                                        <div className="wrapper-heading">EMPOWERING WEAVERS</div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FeatureWrapper;
