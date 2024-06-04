import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function ExploreCategories() {
    const products = [
        {
            id: 1,
            imageUrl: "https://manyavar.scene7.com/is/image/manyavar/ULB4395-422_01_12-05-2021-18-59:283x395",
            name: "LEHENGA",
        },
        {
            id: 2,
            imageUrl: "https://manyavar.scene7.com/is/image/manyavar/141222-1-616_12-05-2021-14-44-2:283x395",
            name: "SAREE",
        },
        {
            id: 3,
            imageUrl: "https://manyavar.scene7.com/is/image/manyavar/SKT4756-436-SEA%20GREEN_0249_29-06-2023-14-20:283x395",
            name: "INDO WESTERN",
        },
        {
            id: 4,
            imageUrl: "https://manyavar.scene7.com/is/image/manyavar/9000004355.21346_12-05-2023-02-09:283x395",
            name: "BRIDAL COLLECTION",
        },
    ];

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
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
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
        ],
    };

    return (
        <>
            <div className="py-5">
                <div className="container">
                    <div className="text-center">
                        <h5 className="min-heading mb-3" style={{ color: '#007B84' }}>EXPLORE</h5>
                        <h2>CATEGORIES</h2>
                    </div>
                    <div className="mt-md-5 mt-3">
                        <Slider {...settings}>
                            {products.map(product => (
                                <div key={product.id}>
                                    <a href='/product-list' className="m-2 text-center">
                                        <div className="p-2">
                                            <div className="explore-card-bg">
                                                <div>
                                                    <img src={product.imageUrl} alt="product" width='100%' />
                                                </div>
                                                <div className="explore-card-categories mt-2 mb-0">
                                                    <p style={{ marginBottom: '3px' }}>{product.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExploreCategories;
