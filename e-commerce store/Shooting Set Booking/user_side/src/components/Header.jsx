import React, { useState } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import CartModal from "./CartModal";
import ColorButton from "./ColorButton";
import NavbarMobile from "./NavbarMobile";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-black/20 fixed h-16 lg:h-24 w-full flex items-center justify-between z-10 px-8">
      <Logo />
      <Navbar />
      <div className="flex flex-row gap-5">

        <div className="hidden lg:flex">
          <ColorButton text="book now" link="/" />
        </div>
        <div className="flex lg:hidden">
          {isOpen ? (
            <AiOutlineClose size={25} fill="white" onClick={() => setIsOpen(!isOpen)} />
          ) : (
            <GiHamburgerMenu size={25} fill="white" onClick={() => setIsOpen(!isOpen)} />
          )}
        </div>
      </div>
      <NavbarMobile hamStatus={isOpen} setHamStatus={setIsOpen} />
    </header>
  );
};

export default Header;
