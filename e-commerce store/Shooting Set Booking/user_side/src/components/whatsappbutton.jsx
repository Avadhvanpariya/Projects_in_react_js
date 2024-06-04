import React from "react";
import { FaWhatsapp } from "react-icons/fa6";

const WhatsApp = () => {
    return (
        <>
            <a href="https://api.whatsapp.com/send?phone=+918200073366&text=Hello I want to know more about Vatrika Resorts" class="float" target="_blank">
                <FaWhatsapp  className="my-float" />
            </a>
        </>
    );
};

export default WhatsApp;