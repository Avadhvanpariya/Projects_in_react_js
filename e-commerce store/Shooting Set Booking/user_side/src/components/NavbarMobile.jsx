import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ColorButton from "./ColorButton";
import { BsChevronDown } from "react-icons/bs";
import Swal from "sweetalert2";

const NavbarMobile = ({ hamStatus, setHamStatus }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("authorization") !== null
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Update isAuthenticated state based on localStorage
    setIsAuthenticated(localStorage.getItem("authorization") !== null);
  }, []);

  const handleLogout = () => {
    // Show SweetAlert confirmation
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle logout logic, clear localStorage or perform logout API call
        localStorage.removeItem("authorization");
        // Update isAuthenticated state to trigger re-render
        setIsAuthenticated(false);

        // Show success SweetAlert
        Swal.fire({
          title: "Logout Successful",
          icon: "success",
        });
      }
    });
  };

  return (
    <div
      className={`${hamStatus ? "scale-x-100" : "scale-x-0"
        } lg:hidden absolute w-10/12 left-[8.33%] top-28 bg-black/95 duration-300`}
    >
      <div className="flex flex-col p-3 gap-2">
        <Link
          to="/"
          key="home"
          className="flex items-center justify-left pl-5 text-white w-full h-10 border-b-[1px] uppercase"
        >
          Home
        </Link>
        <Link
          to='/contact'
          key={'Contact'}
          className="flex items-center justify-left pl-5 text-white w-full h-10 border-b-[1px] uppercase"
        >
          Contact
        </Link>
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-left pl-5 text-white w-full h-10 border-b-[1px] uppercase focus:outline-none"
          >
            Gallery
            <BsChevronDown
              size={25}
              fill="white"
              className={`${isDropdownOpen ? "rotate-0" : "rotate-90"
                } duration-300`}
            />
          </button>
          {isDropdownOpen && (
            <div className="origin-top-left absolute left-0 mt-2 w-32 rounded-md shadow-lg bg-lightBlackClr ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <Link to='/photos' className="block px-4 py-2 text-sm text-white hover:bg-primaryClr hover:text-white" role="menuitem">
                Photos
              </Link>
              <Link to='/videos' className="block px-4 py-2 text-sm text-white hover:bg-primaryClr hover:text-white" role="menuitem">
                Videos
              </Link>
            </div>
          )}
        </div>
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              key="profile"
              className="flex items-center justify-left pl-5 text-white w-full h-10 border-b-[1px] uppercase"
            >
              Profile
            </Link>
            <Link
              to="/"
              key="logout"
              onClick={handleLogout}
              className="flex items-center justify-left pl-5 text-white w-full h-10 border-b-[1px] uppercase"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              key="login"
              className="flex items-center justify-left pl-5 text-white w-full h-10 border-b-[1px] uppercase"
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              key="signup"
              className="flex items-center justify-left pl-5 text-white w-full h-10 border-b-[1px] uppercase"
            >
              Register
            </Link>
          </>
        )}
        <div className="flex items-center justify-center m-5">
          <ColorButton text="book now" link="/" />
        </div>
      </div>
    </div>
  );
};

export default NavbarMobile;
