import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/vartika_white.png";

const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <Link to="/">
        <img src={logo} alt="vartika" style={{ width: '150px' }} />
      </Link>
    </div>
  );
};

export default Logo;
