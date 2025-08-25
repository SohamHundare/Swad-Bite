import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUserCircle } from "@fortawesome/free-solid-svg-icons"; // added profile icon
import { FaBars } from "react-icons/fa";
import logo from "../Images/Logo.png";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import ProfileMenu from "./ProfileMenu";

const Navbar = ({ onTriggerCurtain }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const location = useLocation();

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/" || location.pathname === "/home"
      : location.pathname === path;

  const linkClasses = (path) =>
    `text-lg font-bold uppercase tracking-wide px-4 py-3 transition duration-300 ${
      isActive(path)
        ? "text-amber-600 border-b-4 border-amber-600"
        : "text-gray-700 hover:text-amber-600 hover:border-b-4 hover:border-amber-400"
    }`;

  const handleLogoClick = () => {
    if (onTriggerCurtain) onTriggerCurtain();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 md:px-10 py-2">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src={logo}
            alt="SwadBite Logo"
            className="h-16 w-16 rounded-full mr-3 object-cover shadow-md"
          />
          <span
            className="text-4xl font-extrabold text-amber-600 drop-shadow-lg"
            style={{ fontFamily: "Bungee, cursive" }}
          >
            SwadBite
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/home" className={linkClasses("/")}>Home</Link>
          <Link to="/explore" className={linkClasses("/explore")}>Explore</Link>
          <Link to="/feedback" className={linkClasses("/feedback")}>Feedback</Link>
          <Link to="/order" className={linkClasses("/order")}>Order</Link>
          <Link to="/plans" className={linkClasses("/plans")}>Plans</Link>
          <Link to="/cart" className={linkClasses("/cart")}>
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />Cart
          </Link>

        {!user ? (
  <Link to="/login" className={linkClasses("/login")}>
    Login
  </Link>
) : (
  <ProfileMenu onLogout={logout} />
)}


        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-amber-600"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-inner">
          <div className="px-6 py-3 space-y-2">
            {[
              { path: "/home", label: "Home" },
              { path: "/explore", label: "Explore" },
              { path: "/feedback", label: "Feedback" },
              { path: "/order", label: "Order" },
              { path: "/plans", label: "Plans" },
              { path: "/cart", label: <FontAwesomeIcon icon={faShoppingCart} size="lg" /> },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${linkClasses(item.path)} block border-b`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {!user ? (
  <Link to="/login" className={linkClasses("/login")}>
    Login
  </Link>
) : (
  <ProfileMenu onLogout={logout} />
)}


          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
