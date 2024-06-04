import React from 'react'
import FreeServices from '../components/FreeServices'
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import HomeHero from '../components/HomeHero'
// import ShortAbout from '../components/ShortAbout'
// import Capacity from '../components/Capacity'
import OurSets from '../components/OurSets'
import DayPicnicPackages from '../components/DayPicnicPackages'
import Priceing from '../components/Priceing'
import Whatweprovide from '../components/WhatweProvide'
import Richtext from '../components/Richtext'
import Whatweprovide2 from '../components/WhatweProvide2'
import ContactForm from '../components/ContactForm'
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsApp from '../components/whatsappbutton';

const Home = () => {
  return (
    <div>
      <WhatsApp />
      <Header />
      <HomeHero />
      {/* <ShortAbout/> */}
      <FreeServices />
      {/* <Capacity /> */}
      <OurSets />
      <Priceing />
      <DayPicnicPackages />
      <Richtext />
      <Whatweprovide />
      <Whatweprovide2 />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default Home