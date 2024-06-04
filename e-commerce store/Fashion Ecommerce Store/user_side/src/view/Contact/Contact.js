import React from "react";
import { Footer } from "../../components/FooterStyle/footer";
import FeatureWrapper2 from "../../components/Women/featurewrapper";
import Header from "../../components/HeaderStyle/secondheader";
import BannerImg from "../../components/Contact/bannertext";
import ContactForm from "../../components/Contact/Contact-form";
import { Helmet } from "react-helmet";

function ContactUs() {
    return (
        <>
            {/* Meta tags */}
            <Helmet>
                <title>Get in Touch with Raj Rachana | Customer Care & Support</title>
                <meta name="description" content="Connect with Raj Rachana for inquiries or support. Our dedicated team is here to assist you with your designer lehenga selections, order queries, and more. Reach out today!" />
                <meta name="keywords" content="designer lehenga, ethnic dresses for women, womens collection, designer lehenga blouse, designer lehenga by sabyasachi, women's winter clothing, designer lehenga for wedding, designer lehenga for bride, bridal lehenga golden, designer lehenga for women, bridal lehenga golden colour, trendy women's clothing, raj rachna, raj rachana" />
            </Helmet>
            <Header />
            <BannerImg />
            <ContactForm />
            <FeatureWrapper2 />
            <Footer />
        </>
    );
}

export default ContactUs;
