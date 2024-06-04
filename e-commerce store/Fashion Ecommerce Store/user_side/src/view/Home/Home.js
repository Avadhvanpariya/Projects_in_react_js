import React from "react";
import ControlledCarousel from "../../components/Home/heroslider";
import Header from "../../components/HeaderStyle/header";
import { Footer } from "../../components/FooterStyle/footer";
import BestCategoryForYou from "../../components/Home/bestcategory";
import NewArrivals from "../../components/Home/newarrivals";
import Richtext from "../../components/Home/richtext";
import FeaturedProducts from "../../components/Home/featuredproducts";
import FeatureWrapper from "../../components/Home/featurewrapper";
import WeddingCollection from "../../components/Home/weddingcollection";
import Blogscard from "../../components/Home/blogcard";
import FlashBar from "../../components/HeaderStyle/fleshbar";
import FastiveSpotlight from "../../components/Home/fastive-spotlight";
import { Helmet } from "react-helmet";



function Home() {
  return (
    <>
      {/* Meta tags */}
      <Helmet>
        <title>Raj Rachana: Exquisite Designer Lehenga & Trendy Ethnic Wear</title>
        <meta name="description" content="Discover the essence of elegance with Raj Rachana's designer lehenga and ethnic dresses for women. Indulge in a curated collection that blends tradition with trends. Your journey to sartorial perfection starts here." />
        <meta name="keywords" content="designer lehenga, ethnic dresses for women, womens collection, designer lehenga blouse, designer lehenga by sabyasachi, women's winter clothing, designer lehenga for wedding, designer lehenga for bride, bridal lehenga golden, designer lehenga for women, bridal lehenga golden colour, trendy women's clothing, raj rachna, raj rachana" />
      </Helmet>
      <FlashBar />
      <Header />
      <ControlledCarousel />
      <BestCategoryForYou />
      <FastiveSpotlight />
      <NewArrivals />
      <Richtext />
      <FeaturedProducts />
      {/* <WeddingCollection /> */}
      <Blogscard />
      <FeatureWrapper />
      <Footer />
    </>
  );
}

export default Home;
