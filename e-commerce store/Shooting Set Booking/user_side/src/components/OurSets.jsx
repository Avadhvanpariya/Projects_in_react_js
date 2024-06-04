import React from "react";
import BestRoomsSlider from "./BestRoomsSlider";

import BorderButton from "./BorderButton";

const OurSets = () => {
  return (
    <div className="container">
      <div className=" pt-10  max-w-5xl mx-auto items-center justify-between">
        <div>
          <div className="text-4xl lg:text-6xl text-center w-full font-btnFont text-black pb-2">
            Our Pre-wedding Sets
          </div>
          {/* <div className="text-left text-fontClrGrey font-semibold mb-10 w-full lg:w-3/4">
            Consectetur adipisicing elit. Nihil, illum voluptate eveniet ex
            fugit ea delectus, sed voluptatem.
          </div> */}
        </div>
        {/* <BorderButton text="all rooms" link="/" /> */}
      </div>
      <div className="">
        <BestRoomsSlider />
      </div>
    </div>
  );
};

export default OurSets;
