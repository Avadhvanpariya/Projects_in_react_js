import React from "react";
import { socials } from "../data/socials";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";

import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blackClr">
      <div className="container py-5">
        <div className="row">
          <div className="flex flex-col col-md-4 items-center lg:items-start">
            <Logo />
            <div className="text-fontClrGrey lg:text-left mt-2">
              Vartika Resorts is your gateway to a tranquil escape in the heart of nature. Nestled amidst breathtaking natural beauty, our resort offers a perfect retreat from the hustle and bustle of urban life.
            </div>
            <p style={{color:'#fff'}}>CLUB GALAXY CORPORATION </p>
          </div>
          <div className="flex flex-col col-md-4 items-center lg:items-start " >
            <div style={{ marginLeft: '80px' }}>
              <h3 className="text-white">Social Media</h3>
              <div className="text-white gap-3 ml-4 mt-4 text-left">
                {/* {socials.map(social => (
                  <a href={social.link} key={social.name} className="w-7 h-7 border-2 mb-3 border-primaryClr flex items-center justify-center rounded-full hover:bg-white hover:text-black  ease-in-out">
                    {social.element}

                  </a>
                ))} */}
                <Link to="/TermsAndCondition">
                  <p style={{ color: '#fff' }}><b>Terms And Condition</b>
                  </p></Link>
                <Link to="/returnpolicy">
                  <p style={{ color: '#fff' }}><b>Return Policy</b>
                  </p></Link>
                <Link to="/privacypolicy">
                  <p style={{ color: '#fff' }}><b>Privacy Policy</b>
                  </p></Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col col-md-4 items-left lg:items-start">
            <h3 className="text-white">Contact Us</h3>
            <div className="mt-3 text-left">
              <a href="">
                <p style={{ color: '#fff' }}><b>Address:</b> Vatrika Club galaxy Resort, 3XH9+95X, Unnamed Road, Punadra, Gujarat 387610</p>
              </a>
             
              {/* <a href="">
                <p style={{ color: '#fff' }}><b>Email:</b></p>
              </a>
              <a href="">
                <p style={{ color: '#fff' }}><b>Contact:</b></p>
              </a> */}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black">
        <div className="bg-black flex flex-col lg:flex-row items-center justify-center lg:justify-between text-white font-normal p-4 gap-2 lg:max-w-5xl mx-auto">
          <div>©2023 Vartika Resorts. All Rights Reserved.</div>
          <div>
            Developed by: <a>Fitit Official</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
