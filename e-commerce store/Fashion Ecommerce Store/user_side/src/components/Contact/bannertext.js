import React from "react";
import img from '../../assets/images/bn.jpg'

function BannerImg() {
    return (
        <>
            <section class="ban_sec">
                <div class="ban_img">
                    <img src={img} alt="banner" border="0" />
                    <div class="ban_text">
                        <h2 className="text-white m-auto">Contact Us</h2>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BannerImg;
