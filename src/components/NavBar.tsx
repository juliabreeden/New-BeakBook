import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaX } from "react-icons/fa6";
import logo from "../assets/logo-transparent-png.png";
import "../styles/styles.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 30px",
    background: "radial-gradient(circle at right bottom, #ffe0c2 , #b8ffff)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    fontFamily: "Poppins",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    zIndex: "1000",
  };

  const navLinkStyle: React.CSSProperties = {
    textDecoration: "none",
    color: "#333",
    fontSize: "16px",
    marginLeft: "10px",
    marginRight: "10px",
    fontWeight: "bold",
  };

  const menuStyle: React.CSSProperties = {
    flexDirection: "column",
    alignItems: "center",
    position: "fixed",
    top: "60px",
    right: "30px",
    background:
      "radial-gradient(circle at right bottom, rgba(255, 224, 194, 0.8), rgba(184, 255, 255, 0.8))",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    borderRadius: "10px",
    display: isOpen ? "flex" : "none",
    transition: "all 0.3s ease-in-out", // Add transition for dropdown effect
  };

  const hamburgerStyle: React.CSSProperties = {
    display: "none", // Initially hidden, media query will show it
    cursor: "pointer",
    fontSize: "24px",
    color: "#333",
    marginLeft: "auto",
    zIndex: 2000,
  };

  return (
    <nav style={navStyle}>
      <img src={logo} alt="Logo" style={{ width: "100px" }} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="nav-links">
          <Link to="/home" style={navLinkStyle}>
            {" "}
            Home{" "}
          </Link>
          <Link to="/birdCards" style={navLinkStyle}>
            {" "}
            My Sightings{" "}
          </Link>
          <Link to="/create" style={navLinkStyle}>
            {" "}
            New Sighting{" "}
          </Link>
          <Link to="/identify" style={navLinkStyle}>
            {" "}
            Identify{" "}
          </Link>
          <Link to="/" style={navLinkStyle}>
            {" "}
            Sign out{" "}
          </Link>
        </div>
        {isOpen ? (
          <FaX
            style={hamburgerStyle}
            className="hamburger"
            onClick={toggleMenu}
          />
        ) : (
          <FaBars
            style={hamburgerStyle}
            className="hamburger"
            onClick={toggleMenu}
          />
        )}
      </div>
      {/* Mobile menu */}
      <div style={menuStyle} className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <Link to="/home" style={navLinkStyle} onClick={toggleMenu}>
          {" "}
          Home{" "}
        </Link>
        <Link to="/birdCards" style={navLinkStyle} onClick={toggleMenu}>
          {" "}
          My Sightings{" "}
        </Link>
        <Link to="/create" style={navLinkStyle} onClick={toggleMenu}>
          {" "}
          New Sighting{" "}
        </Link>
        <Link to="/identify" style={navLinkStyle} onClick={toggleMenu}>
          {" "}
          Identify{" "}
        </Link>
        <Link to="/" style={navLinkStyle} onClick={toggleMenu}>
          {" "}
          Sign out{" "}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
