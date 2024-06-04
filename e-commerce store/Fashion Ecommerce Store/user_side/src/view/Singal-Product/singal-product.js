import React from "react";
import { Footer } from "../../components/FooterStyle/footer";
import FeatureWrapper2 from "../../components/Women/featurewrapper";
import Header from "../../components/HeaderStyle/secondheader";
import RecommenedForYou from "../../components/Women/recommenedforyou";
import BreadCrumb from "../../components/Singal-Product/breadcrumb";
import ProductInfo from "../../components/Singal-Product/product-info";


function SingalProduct() {
  return (
    <>
      
      <Header />
      {/* <BreadCrumb /> */}
      <ProductInfo />
      <RecommenedForYou />
      <FeatureWrapper2 />
      <Footer />
    </>
  );
}

export default SingalProduct;
