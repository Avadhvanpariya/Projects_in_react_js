import React from "react";
import Header from "../../components/HeaderStyle/header";
import { Footer } from "../../components/FooterStyle/footer";
import ControlledCarousel2 from "../../components/Women/heroslider";
import FeatureWrapper2 from "../../components/Women/featurewrapper";
import ExploreCategories from "../../components/Women/explorecategories";
import WeddingEdit from "../../components/Women/weddingedit";
import NewArrivals from "../../components/Women/newarrivals";
import RecommenedForYou from "../../components/Women/recommenedforyou";
import Richtext from "../../components/Women/richtext";
import { Helmet } from "react-helmet";


function Women() {
  return (
    <>
      {/* Meta tags */}
      <Helmet>
        <title>Raj Rachana Women's Collection: Designer Lehengas & Winter Clothing</title>
        <meta name="description" content="Embrace the season's latest styles with Raj Rachana's Women's Collection. Find your dream designer lehenga, winter wear, and more. Shop the trends that define elegance" />
        <meta name="keywords" content="designer lehenga, ethnic dresses for women, womens collection, designer lehenga blouse, designer lehenga by sabyasachi, women's winter clothing, designer lehenga for wedding, designer lehenga for bride, bridal lehenga golden, designer lehenga for women, bridal lehenga golden colour, trendy women's clothing, raj rachna, raj rachana" />
      </Helmet>
      {/* Meta tags */}
      <Header />
      <ControlledCarousel2 />
      <ExploreCategories />
      <WeddingEdit />
      <NewArrivals />
      <Richtext />
      <RecommenedForYou />
      <FeatureWrapper2 />
      <Footer />
    </>
  );
}

export default Women;
