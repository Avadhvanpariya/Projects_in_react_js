import React from "react";
import CheckoutHeader from "../../components/HeaderStyle/Checkoutheader";
import CheckoutForm from "../../components/Checkout/checkout";
import { CheckOutFooter } from "../../components/FooterStyle/checkoutfooter";


function CheckOut() {
    return (
        <>
            <CheckoutHeader />
            <CheckoutForm />
            <CheckOutFooter />
        </>
    );
}

export default CheckOut;
