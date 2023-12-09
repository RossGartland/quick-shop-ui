import React, { useEffect, useState } from "react";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useLocation } from "react-router-dom";
import { FaSearchLocation, FaHandsHelping, FaStoreAlt } from "react-icons/fa";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { BiUserPlus } from "react-icons/bi";
import "./navbar.style.css";

function Navbar() {
  const location = useLocation();
  const [navBg, setNavBg] = React.useState("red");
  const [navPosition, setNavPosition] = React.useState("static");
  const [showAdmin, setShowAdmin] = useState(false);
  const [showOwner, setShowOwner] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname == "/") {
      setNavBg("rgba(0, 0, 0, 0.5)");
      setNavPosition("absolute");
    } else {
      setNavBg("#f4876f");
      setNavPosition("static");
    }
    if (currentUser !== null) {
      setShowOwner(currentUser.roles.includes("ROLE_STORE_OWNER"));
      setShowAdmin(currentUser.isAdmin);
    }
  }, [currentUser, location]);
  const logOut = () => {
    AuthService.logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark mynav mx-auto"
        style={{ backgroundColor: navBg, position: navPosition }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse mx-auto d-lg-flex justify-content-center"
          id="navbarNav"
        >
          <Link
            to={"/"}
            className="navbar-brand d-lg-flex justify-content-center"
          >
            QUICK SHOP
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/search"} className="nav-link">
                <FaSearchLocation className="mr-1" />
                SEARCH
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/partnersinfo"} className="nav-link">
                <FaHandsHelping className="mr-1" />
                PARTNER WITH US
              </Link>
            </li>
            {showOwner && (
              <li className="nav-item">
                <Link to={"/mystores"} className="nav-link">
                  <FaStoreAlt className="mr-1" />
                  MY STORES
                </Link>
              </li>
            )}

            {currentUser ? (
              <React.Fragment>
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    <FiUser className="mr-1" />
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link" onClick={logOut}>
                    <FiLogOut className="mr-1" />
                    LogOut
                  </a>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <Link to={"/signin"} className="nav-link">
                    <FiLogIn className="mr-1" />
                    LOGIN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    <BiUserPlus className="mr-1" />
                    SIGN UP
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
