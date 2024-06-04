import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import blogimg1 from '../../assets/Mistakes-With-Lehenga.jpg'
import blogimg2 from '../../assets/5-Style-Hacks.jpg'
import blogimg3 from '../../assets/Wedding-Trends.jpg'
import right from '../../assets/arrow-right.png'


function Blogscard() {

    const products = [
        {
            id: 1,
            imageUrl: blogimg1,
            name: "10 Mistakes You're Making With Lehenga",
            link: "/10-mistakes-you're-making-with-lehenga",
        },
        {
            id: 2,
            imageUrl: blogimg2,
            name: "5 Style Hacks Every Woman Needs to Know",
            link: "/5-style-hacks-every-woman-needs-to-know",
        },
        {
            id: 3,
            imageUrl: blogimg3,
            name: "the biggest Wedding Trends Of 2024",
            link: "/the-biggest-wedding-trends-of-2024",
        },

    ];

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
            <div className="py-5 body-bg" style={{ height: '380px' }}>
                <div className="container">
                    <div className="text-center">
                        {/* <h5 className="min-heading mb-3" style={{ color: '#007B84' }}>Wedding Outfits</h5> */}
                        <h2 className="text-white">The Blogs</h2>
                    </div>
                    <div className="mt-5">
                        <Slider {...settings}>
                            {products.map(product => (
                                <div key={product.id}>
                                    <div className="m-2">
                                        <div>
                                            <img src={product.imageUrl} alt="product" width='100%' style={{ borderRadius: '5px' }} />
                                        </div>
                                        <div className="product-card-details mt-3 mb-0">
                                            <p style={{ fontSize: '18px', color: '#000' }}>{product.name}</p>
                                            <div className="mt-2 d-flex">
                                                <a href={product.link} style={{ color: '#074044' }}>Read more</a>
                                                <img src={right} className="img-fluid me-3" style={{ marginLeft: '5px' }} width="22px" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div >
            </div >
        </>
    );
}

export default Blogscard;
