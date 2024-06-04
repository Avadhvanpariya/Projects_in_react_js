import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import category1 from '../../assets/images/crop-top.jpg'
import category2 from '../../assets/images/gown.jpg'
import category3 from '../../assets/images/saree.jpg'
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function BestCategoryForYou() {
    const settings = {
        infinite: true,
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
            <div className="py-5 ">
                <div className="container-fluid">
                    <Container>
                        <div className="text-center">
                            <h1 className="min-heading mb-3">Top collection</h1>
                            <h2>Best Category For you</h2>
                        </div>
                        <div className="mt-2 text-center d-none d-md-block">
                            <Row>
                                <div className="col-md-4 col-12 image-box">
                                    <div className="category-container">
                                        <img src={category1} alt="" className="w-100" />
                                        <div className="clr"></div>
                                        <div className="clr-box">
                                            <p>Festival Crop-Top</p>
                                            <a href='/product-list?search=Crop-top' className="btn" variant="outline-light" style={{ border: '2px solid #fff', borderRadius: '6px', color: 'white' }}>View More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 image-box">
                                    <div className="category-container">
                                        <img src={category2} alt="" className="w-100" />
                                        <div className="clr"></div>
                                        <div className="clr-box">
                                            <p>Festival Gown</p>
                                            <a href='/product-list?search=Gown' className="btn" variant="outline-light" style={{ border: '2px solid #fff', borderRadius: '6px', color: 'white' }}>View More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12 image-box">
                                    <div className="category-container">
                                        <img src={category3} alt="" className="w-100" />
                                        <div className="clr"></div>
                                        <div className="clr-box">
                                            <p>Festival Saree</p>
                                            <a href='/product-list?search=Saree' className="btn" variant="outline-light" style={{ border: '2px solid #fff', borderRadius: '6px', color: 'white' }}>View More</a>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </div>
                        <div className="mt-2 text-center d-block d-md-none">
                            <Slider {...settings}>
                                <div className="image-box">
                                    <div className="category-container">
                                        <img src={category1} alt="" className="w-100" />
                                        <div className="clr"></div>
                                        <div className="clr-box">
                                            <p>Festival Kurta</p>
                                            <a href='/product-list' className="btn" variant="outline-light" style={{ border: '2px solid #fff', borderRadius: '6px', color: 'white' }}>View More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="image-box">
                                    <div className="category-container">
                                        <img src={category2} alt="" className="w-100" />
                                        <div className="clr"></div>
                                        <div className="clr-box">
                                            <p>Festival Kurta</p>
                                            <a href='/product-list' className="btn" variant="outline-light" style={{ border: '2px solid #fff', borderRadius: '6px', color: 'white' }}>View More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="image-box">
                                    <div className="category-container">
                                        <img src={category3} alt="" className="w-100" />
                                        <div className="clr"></div>
                                        <div className="clr-box">
                                            <p>Festival Saree</p>
                                            <a href='/product-list' className="btn" variant="outline-light" style={{ border: '2px solid #fff', borderRadius: '6px', color: 'white' }}>View More</a>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default BestCategoryForYou;

