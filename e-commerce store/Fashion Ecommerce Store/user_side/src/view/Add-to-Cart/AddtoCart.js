import React from "react";
import { Footer } from "../../components/FooterStyle/footer";
import Header from "../../components/HeaderStyle/secondheader";
import RecommenedForYou from "../../components/Women/recommenedforyou";
import Cart from "../../components/AddToCart/cart";
import { Helmet } from "react-helmet";



function AddToCart() {
    return (
        <>
            {/* Meta tags */}
            <Helmet>
                <title> Add to Cart: Shop Your Favorites at Raj Rachana</title>
                <meta name="description" content="Ready to make your selections? Add your favorite items to your cart and proceed to checkout for a seamless shopping experience at Raj Rachana. Explore our collection now!" />
                <meta name="keywords" content="Fashion Accessories,Indian Ethnic Wear,Shop Online,Women's Fashion,Traditional Clothing,Designer Kurtis,Bridal Lehengas,Silk Sarees,Cotton Kurtis,Wedding Sarees,Ethnic Dresses,Party Wear Sarees,Embroidered Lehengas,Printed Sarees,Anarkali Kurtis,Chiffon Lehengas,Casual Kurtis" />
            </Helmet>
            <Header />
            <Cart />
            <RecommenedForYou />
            <Footer />
        </>
    );
}

export default AddToCart;
