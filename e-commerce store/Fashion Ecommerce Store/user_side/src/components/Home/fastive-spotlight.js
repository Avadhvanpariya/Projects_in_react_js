import React from "react";
import img1 from '../../assets/images/3.1.jpg'
import img2 from '../../assets/images/3.jpg'
import { Container } from "react-bootstrap";

function FastiveSpotlight() {
    const backgroundImageUrl = img1; // Replace with your actual image URL
    const backgroundImageUrl2 = img2;

    const containerStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        minHeight: '100vh',  // Set a minimum height to cover the entire viewport
    };

    const containerStyle1 = {
        backgroundImage: `url(${backgroundImageUrl2})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        minHeight: '80vh',  // Set a minimum height to cover the entire viewport
    };

    return (
        <>
            <div className="">
                <div className="container-fluid">
                    <Container>
                        <div className="text-center mb-4">
                            <h2>Festive Spotlight</h2>
                        </div>
                    </Container>
                </div>
                <a href="/product-list"><div className="py-5 richtext-bg d-none d-md-block" style={containerStyle1}></div></a>
                <a href="/product-list"><div className="py-5 richtext-bg d-block d-md-none" style={containerStyle}></div></a>

            </div>
        </>
    );
}

export default FastiveSpotlight;
