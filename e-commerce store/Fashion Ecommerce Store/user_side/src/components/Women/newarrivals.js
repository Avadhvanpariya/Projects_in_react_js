import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axiosInstance from '../../js/api';
import { toast } from 'react-toastify';


function NewArrivals() {
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
        autoplay: true,
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
            <div className="py-5" style={{ marginTop: '120px' }}>
                <div className="container">
                    <div className="text-center">
                        <h5 className="min-heading mb-3" style={{ color: '#007B84' }}>Top collection</h5>
                        <h2>NEW ARRIVALS</h2>
                    </div>
                    <div className="mt-md-5 mt-3">
                        <Slider {...settings}>
                            {productData.map(product => (
                                <div key={product.id} className="col-md-4 pt-3 px-3 col-6">
                                    <div className="fav-1">
                                        <div className="">
                                            <img src={product.product_images[0]} alt="product" className="img-fluid" />
                                            <a className="" href={`/product-view/${encodeURIComponent(product.name.toLowerCase())}`}>
                                                <div className="product-card-details2 mt-3 mb-0 d-flex ">
                                                    <div>
                                                        <p style={{ color: '#000', fontSize: '20px' }}>{product.name}</p>
                                                        <p className="product-card-price2" style={{ fontFamily: 'sans-serif', fontSize: '16px' }}>₹ {product.price}</p>
                                                    </div>

                                                </div>
                                            </a>
                                        </div>
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

export default NewArrivals;
