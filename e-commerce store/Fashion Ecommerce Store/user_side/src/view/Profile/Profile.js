import React from "react";
import { Footer } from "../../components/FooterStyle/footer";
import Header from "../../components/HeaderStyle/secondheader";
import FeatureWrapper2 from "../../components/Women/featurewrapper";
import ProfilePage from "../../components/Profile/profilepage";

function Profile() {
    return (
        <>
            <Header />
            <ProfilePage />
            {/* <FeatureWrapper2 /> */}
            <Footer />
        </>
    );
}

export default Profile;
