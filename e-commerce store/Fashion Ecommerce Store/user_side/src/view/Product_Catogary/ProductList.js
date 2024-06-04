import React from "react";
import { Footer } from "../../components/FooterStyle/footer";
import FeatureWrapper2 from "../../components/Women/featurewrapper";
import Header from "../../components/HeaderStyle/secondheader";
import ProductCatogarys from "../../components/Product_CatogaryList/productlist";
import ShopTextImg from "../../components/Product_CatogaryList/bannertext";
import { Helmet } from "react-helmet";

function ProductCatogaryList() {
  return (
    <>
      {/* Meta tags */}
      <Helmet>
        <title>Raj Rachana's Online Boutique: Shop Bridal Lehengas & Ethnic Dresses</title>
        <meta name="description" content="Raj Rachana's online boutique presents a treasure trove of designer lehengas, bridal collections, and ethnic dresses. Golden hues, exquisite fabrics, shop the best for every occasion." />
        <meta name="keywords" content="designer lehenga, ethnic dresses for women, womens collection, designer lehenga blouse, designer lehenga by sabyasachi, women's winter clothing, designer lehenga for wedding, designer lehenga for bride, bridal lehenga golden, designer lehenga for women, bridal lehenga golden colour, trendy women's clothing, raj rachna, raj rachana" />
      </Helmet>
      <Header />
      {/* <BreadCrumb /> */}
      <ShopTextImg />
      <ProductCatogarys />
      <FeatureWrapper2 />
      <Footer />
    </>
  );
}

export default ProductCatogaryList;
