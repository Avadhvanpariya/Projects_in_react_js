import React from "react";
import { Footer } from "../../components/FooterStyle/footer";
import Header from "../../components/HeaderStyle/secondheader";
import FeatureWrapper2 from "../../components/Women/featurewrapper";
import OrderDetails from "../../components/Profile/orderdetail";

function Profile() {
    return (
        <>
            <Header />
            <OrderDetails />
            <Footer />
        </>
    );
}

export default Profile;
