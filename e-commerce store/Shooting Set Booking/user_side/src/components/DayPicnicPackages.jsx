// DayPicnicPackages.js

import React from "react";
import pick_1 from '../assets/pick-1.png'
import pick_2 from '../assets/pick-2.png'
import pick_3 from '../assets/pick-3.png'
import pick_4 from '../assets/pick-4.png'
import gallary37 from '../assets/gallary37.jpeg'
import gallary5 from '../assets/gallary5.jpeg'
import gallary28 from '../assets/gallary28.jpeg'
import gallary41 from '../assets/gallary41.jpeg'
import { FaChess, FaVolleyballBall, FaCamera } from 'react-icons/fa';

const DayPicnicPackages = () => {

  const handlePackageClick = (picnicPackage) => {
    // You can customize the message format as needed
    const message = `I'm interested in the ${picnicPackage.title} package. Price: ${picnicPackage.price}\n\nSend me more details.`;

    // Replace the following URL with the appropriate WhatsApp API or deep link
    const whatsappLink = `https://api.whatsapp.com/send?phone=8200073366&text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new window or redirect to the link
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="container">
      <div className="pt-10 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl lg:text-6xl font-btnFont text-black mb-4">
          DAY PICNIC PACKAGES
        </h1>
        <p className="text-gray-600 mb-6">AT GUJRAT'S NO-1 FILMCITY</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Package Cards */}
          {packages.map((picnicPackage, index) => (
            <div key={index} className="package-card bg-white rounded-lg shadow-md" onClick={() => handlePackageClick(picnicPackage)}>
              <img
                src={picnicPackage.image}
                alt={`Package Image ${index + 1}`}
                className="object-cover mb-2 rounded-lg"
              />
              <div className="px-2 pb-2">
                <h2 className="text-xl font-semibold mb-2">{picnicPackage.title}</h2>
                <p className="text-gray-600 mb-4">{picnicPackage.description}</p>
                <h4 className="text-black font-bold">{picnicPackage.price}</h4>
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-600 mt-8 mb-6">
          (all prices are inclusive of taxes) *T&C APPLY
        </p>
        <p className="text-gray-600 mb-8">
          Photography by mobile camera only
        </p>
      </div>

      {/* Activities Section */}
      <div className="bg-gray-100 py-8">
        <div className="container">
          <h1 className="text-4xl lg:text-6xl font-btnFont text-black mb-4 text-center">
            ACTIVITIES AT THE RESORT
          </h1>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-1 bg-black"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="activity-card bg-white p-6 rounded-lg shadow-md flex flex-col items-center transition-transform duration-300 transform hover:scale-105 hover:text-blue-500">
              <FaChess className="text-4xl mb-2 text-black" />
              <h2 className="text-xl font-semibold mb-2">Indoor Games</h2>
              <p className="text-gray-600 mb-4">Enjoy indoor activities like Carrom and Chess</p>
            </div>
            <div className="activity-card bg-white p-6 rounded-lg shadow-md flex flex-col items-center transition-transform duration-300 transform hover:scale-105 hover:text-green-500">
              <FaVolleyballBall className="text-4xl mb-2 text-black" />
              <h2 className="text-xl font-semibold mb-2">Outdoor Games</h2>
              <p className="text-gray-600 mb-4">Engage in outdoor sports such as Cricket, Badminton, and Volley Ball</p>
              <p className="text-sm">Open Lawn Area, Swimming</p>
            </div>
            <div className="activity-card bg-white p-6 rounded-lg shadow-md flex flex-col items-center transition-transform duration-300 transform hover:scale-105 hover:text-red-500">
              <FaCamera className="text-4xl mb-2 text-black" />
              <h2 className="text-xl font-semibold mb-2">Filmcity Visit</h2>
              <p className="text-gray-600 mb-4">Explore the fascinating Filmcity from 1pm to 3pm or 4.30 pm to 5.30pm</p>
            </div>
          </div>
        </div>
      </div>


      {/* Gallery Section */}
      <div className="mt-12 pb-20">
        <h1 className="text-4xl lg:text-6xl font-btnFont text-black mb-4 text-center">
          GALLERY
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Replace these with your actual image paths */}
          {galleryImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-md gallery-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Example data for packages
const packages = [
  {
    title: "Breakfast, Lunch & Hi-Tea",
    description: "Enjoy a full day with delicious meals and hi-tea",
    price: "₹1299 /-",
    image: pick_1,
  },
  {
    title: "Breakfast + Lunch",
    description: "Start your day with breakfast and enjoy a hearty lunch",
    price: "₹1199 /-",
    image: pick_2,
  },
  {
    title: "Hi Tea + Dinner",
    description: "Savor a refreshing hi-tea experience, culminating in a delightful dinner feast.",
    price: "₹1199 /-",
    image: pick_3,
  },
  {
    title: "Food & Night Stay",
    description: "Check-in at 11:00 am & Check out at 11:00 am next day",
    price: "₹2200 /-",
    image: pick_4,
  },
];

// Example data for gallery images
const galleryImages = [
  gallary37,
  gallary41,
  gallary28,
  gallary5
];

export default DayPicnicPackages;
