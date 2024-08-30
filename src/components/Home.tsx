import React from "react";
import { useNavigate } from "react-router-dom";
import heroBackground from "../assets/heroBackground.jpg";
import "../styles/styles.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const heroContainerStyle: React.CSSProperties = {
    backgroundImage: `url(${heroBackground})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat", 
    backgroundPosition: "center right", 
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    // padding: '0 20px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "36px",
    fontWeight: "bolder",
    marginBottom: "20px",
    fontFamily: "Lato",
    color: "white",
    whiteSpace: "pre-wrap",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  };

  const buttonStyle: React.CSSProperties = {
    cursor: "pointer",
    height: "40px",
    fontFamily: "Poppins",
    fontWeight: "bolder",
    width: "170px",
    marginTop: "10px",
    marginRight: "10px",
    borderRadius: "10px",
    border: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#b8ffff",
  };

  const buttonStyleHome: React.CSSProperties = {
    cursor: "pointer",
    height: "40px",
    fontFamily: "Poppins",
    fontWeight: "bolder",
    width: "170px",
    marginTop: "10px",
    marginRight: "10px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#ffe0c2",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };

  const heroContentStyle: React.CSSProperties = {
    marginTop: "70px",
    marginLeft: "80px",
  };

  const handleAddSightingClick = () => {
    navigate("/create");
  };

  const handleIdentifyClick = () => {
    navigate("/identify");
  };

  return (
    <div style={heroContainerStyle}>
      <div style={heroContentStyle}>
        <div style={titleStyle}>
          Identify. Track. Soar with Your {"\n"}BeakBook.
        </div>
        <button style={buttonStyle} onClick={handleAddSightingClick}>
          Log a new sighting
        </button>
        <button style={buttonStyleHome} onClick={handleIdentifyClick}>
          Identify unknown bird
        </button>
      </div>
    </div>
  );
};

export default Home;
