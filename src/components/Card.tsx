import React from "react";
import { CardData } from "../App";
import heroBackground from "../assets/heroBackground.jpg";

interface CardProps {
  cards: CardData[];
  editCard: (updatedCard: CardData) => void;
  deleteCard: (cardId: string) => void;
}

const Card: React.FC<CardProps> = ({ cards, deleteCard }) => {
  const cardStyle: React.CSSProperties = {
    textAlign: "center",
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "1rem",
    boxSizing: "border-box",
    margin: "0 auto",
    fontFamily: "Poppins",
    background: "radial-gradient(circle at right bottom, #ffe0c2, #c2ffff)", // Matching form gradient
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  };

  const cardContainerStyle: React.CSSProperties = {
    paddingTop: "50px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridGap: "1rem",
    justifyContent: "center",
    alignItems: "stretch",
    width: "100%",
  };

  const containerStyle: React.CSSProperties = {
    backgroundImage: `url(${heroBackground})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center right",
    minHeight: "100vh", // Ensures it covers the full viewport height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const buttonStyle: React.CSSProperties = {
    cursor: "pointer",
    height: "35px",
    fontFamily: "Poppins",
    width: "157px",
    marginTop: "10px",
    border: "none",
    borderRadius: "10px",
    background: "#0056b3",
    color: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };

  const boldText: React.CSSProperties = {
    fontWeight: "bold",
    fontFamily: "Lato",
  };

  const emptyStateContainerStyle: React.CSSProperties = {
    textAlign: "center",
    paddingTop: "70px",
    fontFamily: "Poppins",
    color: "#333", // Darker text color for better contrast
    background: "radial-gradient(circle at right bottom, #ffe0c2, #c2ffff)", // Matching form gradient
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    margin: "0 auto",
  };

  const emptyStateLinkStyle: React.CSSProperties = {
    color: "#0056b3", // Darker blue link color for better contrast
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      {cards.length === 0 ? (
        <div style={emptyStateContainerStyle}>
          <p>Looks like you don't have any sightings logged yet.</p>
          <a href="/create" style={emptyStateLinkStyle}>
            Create a new sighting
          </a>
        </div>
      ) : (
        <div style={cardContainerStyle}>
          {cards.map((card) => (
            <div key={card._id} style={cardStyle}>
              <p>
                <span style={boldText}>Species identified:</span>{" "}
                <span>{card.species}</span>
              </p>
              <p>
                <span style={boldText}>Date spotted:</span>{" "}
                <span>{card.date}</span>
              </p>
              <p>
                <span style={boldText}>Bird was seen:</span>{" "}
                <span>{card.birdWas}</span>
              </p>
              <p>
                <span style={boldText}>Difficulty:</span>{" "}
                <span>{card.difficulty}</span>
              </p>
              <button style={buttonStyle} onClick={() => deleteCard(card._id)}>
                Delete entry
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
