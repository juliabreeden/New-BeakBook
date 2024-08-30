import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import ConfettiExplosion from "react-confetti-explosion";
import ErrorPopup from "./ErrorPopUp";
import heroBackground from "../assets/heroBackground.jpg";
import "../styles/formStyles.css";

const IdentifyBird: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [colors, setColors] = useState<string>("");
  const [birdWas, setBirdWas] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(true);
  const [responseText, setResponseText] = useState<string>("");
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
  };

  const handleColorsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColors(e.target.value);
  };

  const handleBirdWasChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBirdWas(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!location || !size || !colors || !birdWas) {
      alert("Please fill in all the fields.");
      return;
    }

    const data = {
      location,
      size,
      colors,
      birdWas,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/chat",
        { prompt: JSON.stringify(data) },
        {
          withCredentials: true,
        },
      );

      // Remove any leading/trailing whitespace and extra periods
      const cleanResponseText = response.data
        .trim() // Remove leading/trailing whitespace
        .replace(/[\s.]+$/, ""); // Remove trailing dots or spaces

      setResponseText(cleanResponseText);
      setShowConfetti(true);
      setShowForm(false);

      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleNewIdentification = () => {
    setLocation("");
    setSize("");
    setColors("");
    setBirdWas("");
    setShowForm(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center right",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      {showConfetti && <ConfettiExplosion />}

      {showForm ? (
        <>
          <p
            style={{
              color: "white",
              fontSize: "18px",
              fontFamily: "Poppins",
              textAlign: "center",
              alignSelf: "center",
              marginBottom: "20px",
            }}
          >
            Please enter information about the bird you'd like to identify.
          </p>
          <div className="form-container" style={{ width: "400px" }}>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Location (City/Town, State/Province, Country)"
                  value={location}
                  onChange={handleLocationChange}
                  className="form-input"
                />
              </div>
              <div>
                <select
                  value={size}
                  onChange={handleSizeChange}
                  className="form-input"
                >
                  <option value="" disabled>
                    Size
                  </option>
                  <option value="sparrow sized or smaller">
                    Sparrow sized or smaller
                  </option>
                  <option value="between sparrow and robin">
                    Between sparrow and robin
                  </option>
                  <option value="robin-sized">Robin-sized</option>
                  <option value="between robin and crow">
                    Between robin and crow
                  </option>
                  <option value="crow-sized">Crow-sized</option>
                  <option value="between crow and goose">
                    Between crow and goose
                  </option>
                  <option value="goose-sized or larger">
                    Goose-sized or larger
                  </option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Main colors (color1, color2, color3)"
                  value={colors}
                  onChange={handleColorsChange}
                  className="form-input"
                />
              </div>
              <div>
                <select
                  value={birdWas}
                  onChange={handleBirdWasChange}
                  className="form-input"
                >
                  <option value="" disabled>
                    What was the bird doing?
                  </option>
                  <option value="Eating at a feeder">Eating at a feeder</option>
                  <option value="Swimming or wading">Swimming or wading</option>
                  <option value="On the ground">On the ground</option>
                  <option value="In trees or bushes">In trees or bushes</option>
                  <option value="On a fence or wire">On a fence or wire</option>
                  <option value="Soaring or flying">Soaring or flying</option>
                </select>
              </div>
              <button type="submit" className="form-button">
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <div
          className="form-container"
          style={{ width: "400px", textAlign: "center" }}
        >
          <p
            style={{
              fontFamily: "Poppins",
              fontSize: "18px",
              marginBottom: "20px",
              maxWidth: "200px",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            Possible identification complete!{" "}
            <span
              onClick={handleNewIdentification}
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Identify another bird
            </span>
            .
          </p>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {responseText
              .split(/\d\.\s/) // Use a regex pattern to split by the number followed by a period and space
              .filter(Boolean) // Ensure no empty strings are included
              .map((bird, index) => (
                <p
                  key={index}
                  style={{
                    margin: "10px 0",
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    padding: "5px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  {index + 1}. {bird.trim()}{" "}
                  {/* Ensure each bird name is properly trimmed */}
                </p>
              ))}
          </div>
        </div>
      )}

      <ErrorPopup
        message={errorMessage || ""}
        visible={Boolean(errorMessage)}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};

export default IdentifyBird;
