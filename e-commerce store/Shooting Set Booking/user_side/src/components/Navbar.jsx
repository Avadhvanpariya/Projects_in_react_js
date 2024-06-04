import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
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
    <nav className="hidden lg:flex md:items-center md:justify-center gap-1">
      <div className="py-1 group">
        <div className="py-5 px-2 md:cursor-pointer text-white font-normal hover:text-primaryClr duration-500">
          <Link
            to="/"
            key="home"
            className="text-white text-left px-2 font-normal hover:text-primaryClr duration-500"
          >
            Home
          </Link>
          <Link
            to='/contact'
            key={'Contact'}
            className="text-white text-left px-2 font-normal hover:text-primaryClr duration-500"
          >
            Contact
          </Link>
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="text-white text-left px-2 font-normal hover:text-primaryClr duration-500 focus:outline-none"
            >
              Gallery
            </button>
            {isDropdownOpen && (
              <div className="origin-top-left absolute left-0 mt-2 w-32 rounded-md shadow-lg bg-lightBlackClr ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <div className="py-1" role="none">
                  <Link to='/photos' key={'photos'} className="block px-4 py-2 text-sm text-white hover:bg-primaryClr hover:text-white" role="menuitem">
                    Photos
                  </Link>
                  <Link to='/videos' key={'videos'} className="block px-4 py-2 text-sm text-white hover:bg-primaryClr hover:text-white" role="menuitem">
                    Videos
                  </Link>
                </div>
              </div>
            )}
          </div>
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                key="profile"
                className="text-white text-left px-2 font-normal hover:text-primaryClr duration-500"
              >
                Profile
              </Link>
              <Link
                to="/"
                key="logout"
                onClick={handleLogout}
                className="text-white text-left px-2 font-normal hover:text-primaryClr duration-500"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                key="login"
                className="text-white text-left px-2 font-normal hover:text-primaryClr duration-500"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                key="signup"
                className="text-white text-left px-2 font-normal hover:text-primaryClr duration-500"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
