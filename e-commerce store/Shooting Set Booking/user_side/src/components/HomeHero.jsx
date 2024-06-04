import React from "react";

import heroImg from "../assets/herobackimg.jpeg";
import heroImgMobile from "../assets/herobackimg.jpeg";

import BookingForm from "./bookingform";


const HomeHero = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-black">
      {/* bg-cover bg-center bg-hero animate-background-zoom */}
      <img
        src={heroImg}
        alt=""
        className="absolute hidden heroimg lg:block animate-background-zoom h-full object-cover z-0"
      />
      <img
        src={heroImgMobile}
        alt=""
        className="absolute lg:hidden animate-background-zoom h-full object-cover z-0"
      />
      <div className="absolute z-5 w-full h-full bg-black/40">
        <div className="max-w-5xl mx-auto px-5 pt-20 lg:pt-28 flex flex-col justify-center h-full lg:flex-row lg:items-center ">
          <div className="lg:w-7/12 flex flex-col gap-4">
            <div className="text-center text-5xl lg:text-5xl font-btnFont text-white font-normal">Welcome to Vatrika Resorts </div>
            <div className="text-center">
              <button
                className="text-center text-2xl lg:text-3xl font-btnFont text-white font-normal booknow-btn"
                onClick={() => setModalShow(true)}
              >
                Book Now
              </button>
              <BookingForm
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
