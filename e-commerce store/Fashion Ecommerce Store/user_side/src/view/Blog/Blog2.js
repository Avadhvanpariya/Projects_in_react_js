import React from "react";
import { Footer } from "../../components/FooterStyle/footer";
import FeatureWrapper2 from "../../components/Women/featurewrapper";
import Header from "../../components/HeaderStyle/secondheader";
import BlogBanner from "../../components/Blog/bannertext";
import BlogLayout from "../../components/Blog/bloglayout";
import { Helmet } from "react-helmet";
import BlogLayoutii from "../../components/Blog/bloglayout2";


function Blogii() {
    return (
        <>
            {/* Meta tags */}
            <Helmet>
                <title>Inspiring Design Trends and Decor Tips | Raj Rachana Blog</title>
                <meta name="description" content="Explore insightful blog posts by John Doe and Jane Smith on millennial design and decorating ideas. Stay updated with the latest trends and tips. Discover more at Raj Rachana." />
                <meta name="keywords" content="Fashion Accessories,Indian Ethnic Wear,Shop Online,Women's Fashion,Traditional Clothing,Designer Kurtis,Bridal Lehengas,Silk Sarees,Cotton Kurtis,Wedding Sarees,Ethnic Dresses,Party Wear Sarees,Embroidered Lehengas,Printed Sarees,Anarkali Kurtis,Chiffon Lehengas,Casual Kurtis" />
            </Helmet>
            <section style={{ backgroundColor: '#ffffff' }}>
                <Header />
                {/* <BlogBanner /> */}
                <BlogLayoutii />
                <FeatureWrapper2 />
                <Footer />
            </section>
        </>
    );
}

export default Blogii;
