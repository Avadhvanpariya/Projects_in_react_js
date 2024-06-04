import React from "react";
import Slider from "react-slick";

function FlashBar() {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 5000,
    };
    return (
        <div className="slider-container flashbar-slider">
            <Slider {...settings}>
                <div className="text-center">
                    <h6 className="fleshbar-text">Celebration Wear</h6>
                </div>
                <div className="text-center">
                    <h6 className="fleshbar-text">Easy Returns</h6>
                </div>
                <div className="text-center">
                    <h6 className="fleshbar-text">Free Shipping</h6>
                </div>
            </Slider>
        </div>
    );
}

export default FlashBar;
