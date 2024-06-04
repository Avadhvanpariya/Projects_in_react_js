import React from "react";
import img from '../../assets/images/banner4.png'

function Richtext() {
    const backgroundImageUrl = img; // Replace with your actual image URL

    const containerStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        minHeight: '80vh',  // Set a minimum height to cover the entire viewport
    };

    return (
        <>
            <div className="py-5 richtext-bg" style={containerStyle}>
                <div className="container">
                    <div className="text-center">
                        {/* <h5 className="min-heading mb-3" style={{ color: '#007B84' }}>Top collection</h5>
                        <h2 className="text-white">NEW ARRIVALS</h2> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Richtext;
