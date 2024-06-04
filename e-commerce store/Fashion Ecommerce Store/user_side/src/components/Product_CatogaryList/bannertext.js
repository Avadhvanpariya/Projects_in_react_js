import React from "react";
import img from '../../assets/images/bn.jpg'

function ShopTextImg() {
    return (
        <>
            <section class="ban_sec">
                <div class="ban_img">
                    <img src={img} alt="banner" border="0" />
                    <div class="ban_text text-center" style={{left:'47%'}}> 
                        <h2 className="text-white">Shop</h2>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ShopTextImg;
