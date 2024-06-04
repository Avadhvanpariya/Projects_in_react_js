import React from "react";
import img from "../assets/heroback.jpeg";

const Richtext = () => {
    return (
        <div className="py-20" style={{ backgroundImage: `url(${img})` }}>
            <div className="max-w-5xl mx-auto grid gap-10 ">
                <div className="container">
                    <div className="text-primaryClr text-5xl text-left font-normal font-btnFont mb-4">Why Choose Us?</div>
                    <div className="text-white text-left" style={{ fontWeight: '400' }}>Vartika Resorts is your gateway to a tranquil escape in the heart of nature. Nestled amidst breathtaking natural beauty, our resort offers a perfect retreat from the hustle and bustle of urban life. Whether you seek a romantic getaway, a family vacation, or a peaceful retreat, our accommodations combine modern comfort with the allure of the outdoors. We are deeply committed to sustainability, ensuring your stay has a positive impact on the environment. With a wide range of experiences, from outdoor adventures to relaxation, our dedicated team is here to make your stay memorable from the moment you arrive until you say farewell. For those seeking privacy and seclusion, Vartika Resorts provides an intimate setting, and our picturesque location offers stunning views and easy access to the wonders of nature. Choose Vartika Resorts for an unforgettable blend of luxury and nature.</div>
                </div>
            </div>
        </div>
    );
};

export default Richtext;