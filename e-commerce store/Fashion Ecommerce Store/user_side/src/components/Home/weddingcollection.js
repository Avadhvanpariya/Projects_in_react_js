import React, { useState, useEffect } from "react";
import bgimg from '../../assets/images/spacialcollaction-bg.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axiosInstance from '../../js/api';
import { toast } from 'react-toastify';

function WeddingCollection() {

    const backgroundImageUrl = bgimg;

    const containerStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        minHeight: '90vh',
    };

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

    return (
        <>
            <div className="richtext-bg" style={containerStyle}>
                <div className="py-5">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="text-white">Wedding Collection</h2>
                        </div>
                        <div className="mt-md-5 mt-3">
                            <Slider {...settings}>
                                {productData.map(product => (
                                    <div key={product.id}>
                                        <div className="m-2">
                                            <div>
                                                <img src={product.product_images[0]} alt="product" width='100%' />
                                            </div>
                                            <Link className="" to={`/product-view/${encodeURIComponent(product.name.toLowerCase())}`}>
                                                <div className="mt-2 mb-0">
                                                    <p className="product-card-details">{product.name}</p>
                                                    <p className="product-card-price mt-3" >₹ {product.price}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WeddingCollection;
