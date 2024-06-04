import React from "react";
import gallary37 from '../assets/gallary37.jpeg'
import gallary5 from '../assets/gallary5.jpeg'
import gallary28 from '../assets/gallary28.jpeg'
import gallary41 from '../assets/gallary41.jpeg'

const Priceing = () => {
  return (
    <div className="container pb-20">
      <div className="pt-10 max-w-5xl mx-auto items-center justify-between">
        <div>
          <div className="text-4xl lg:text-6xl text-center w-full font-btnFont text-black pb-4">
            Pre-wedding Pricing all Sets
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Full Day */}
        <div className="hover:scale-105 transition-transform duration-300 ease-in-out bg-white rounded-lg shadow-md">
          <img
            src={gallary37} // Add your icon/image path
            alt="Full Day"
            className="mx-auto mb-2 rounded-lg"
          />
          <div className="px-6 pb-2">
            <h2 className="text-xl font-semibold mb-2">Full Day</h2>
            <p className="text-gray-600 mb-4">7:00 Am to 08:00 PM</p>
            <h4 className="text-black font-bold">Price: ₹17,000 /-</h4>
          </div>
        </div>

        {/* Half Day */}
        <div className="hover:scale-105 transition-transform duration-300 ease-in-out bg-white rounded-lg shadow-md">
          <img
            src={gallary5} // Add your icon/image path
            alt="Half Day"
            className="mx-auto mb-2 rounded-lg"
          />
          <div className="px-6 pb-2">
            <h2 className="text-xl font-semibold mb-2">Half Day</h2>
            <p className="text-gray-600 mb-2">
              07:00 AM to 01:00 PM & 02:00 PM to 09:00 PM</p>
            <h4 className="text-black font-bold">Price: ₹10,000 /-</h4>
          </div>
        </div>

        {/* Hourly */}
        <div className="hover:scale-105 transition-transform duration-300 ease-in-out bg-white rounded-lg shadow-md">
          <img
            src={gallary28} // Add your icon/image path
            alt="Hourly"
            className="mx-auto mb-2 rounded-lg"
          />
          <div className="px-6 pb-2">
            <h2 className="text-xl font-semibold mb-2">Hourly</h2>
            <p className="text-gray-600 mb-4">02:30 hours Slot</p>
            <h4 className="text-black font-bold">Price: ₹5,000 /-</h4>
          </div>
        </div>

        {/* Villa */}
        <div className="hover:scale-105 transition-transform duration-300 ease-in-out bg-white rounded-lg shadow-md">
          <img
            src={gallary41} // Add your icon/image path
            alt="Villa"
            className="mx-auto mb-2 rounded-lg"
          />
          <div className="px-6 pb-2">
            <h2 className="text-xl font-semibold mb-2">Rent Villa</h2>
            <p className="text-gray-600 mb-4">24 hours & 6 person</p>
            <h4 className="text-black font-bold">Price: ₹5,000 /-</h4>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Priceing;
