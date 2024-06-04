import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axiosInstance from '../../js/api';
import { toast } from 'react-toastify';


function FeaturedProducts() {

    const [productData, setProductData] = useState([]);

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
            <div className="py-5 body-bg">
                <div className="container">
                    <div className="text-center">
                        <h5 className="min-heading mb-3" style={{ color: '#007B84' }}>Wedding Outfits</h5>
                        <h2 className="text-white">The Wedding Edits</h2>
                    </div>
                    <div className="mt-5">
                        <Slider {...settings} dots={false} arrows={false}>
                            {productData.map(product => (
                                <div key={product.id}>
                                    <div className="m-2">
                                        <a className="" href={`/product-view/${encodeURIComponent(product.name.toLowerCase())}`}>
                                            <div>
                                                <img src={product.product_images[0]} alt="product" width='100%' />
                                            </div>
                                            <div className="product-card-details mt-2 mb-0">
                                                <p style={{ fontSize: '25px' }}>{product.name}</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FeaturedProducts;
