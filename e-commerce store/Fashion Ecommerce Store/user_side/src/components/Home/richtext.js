import React from "react";
import img from '../../assets/images/2.jpg'
import img1 from '../../assets/images/2.1.jpg'

function Richtext() {
    const backgroundImageUrl = img; // Replace with your actual image URL

    const containerStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        minHeight: '80vh',  // Set a minimum height to cover the entire viewport
    };

    const backgroundImageUrl1 = img1; // Replace with your actual image URL

    const containerStyle1 = {
        backgroundImage: `url(${backgroundImageUrl1})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        minHeight: '80vh',  // Set a minimum height to cover the entire viewport
    };

    return (
        <>
            <a href="/product-list"><div className="py-5 richtext-bg d-none d-md-block" style={containerStyle}></div></a>
            <a href="/product-list"><div className="py-5 richtext-bg d-block d-md-none" style={containerStyle1}></div></a>
        </>
    );
}

export default Richtext;
