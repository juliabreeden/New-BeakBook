import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import ConfettiExplosion from "react-confetti-explosion";
import ErrorPopup from "./ErrorPopUp";
import heroBackground from "../assets/heroBackground.jpg";
import "../styles/formStyles.css";

interface CreateCardProps {
  onSubmit: (newCard: {
    species: string;
    date: string;
    birdWas: string;
    difficulty: string;
  }) => void;
}

const CreateCard: React.FC<CreateCardProps> = ({ onSubmit }) => {
  const [species, setSpecies] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [birdWas, setBirdWas] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [submissionSuccessful, setSubmissionSuccessful] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const handleSpeciesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSpecies(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleBirdWasChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBirdWas(e.target.value);
  };

  const handleDifficultyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!species || !date || !birdWas || !difficulty) {
      setErrorMessage("Please fill in all fields before submitting.");
      return;
    }

    const cardData = {
      species,
      date,
      birdWas,
      difficulty,
    };

    onSubmit(cardData);

    setSpecies("");
    setDate("");
    setBirdWas("");
    setDifficulty("");
    setSubmissionSuccessful(true);
    setShowConfetti(true);
    setErrorMessage(null);

    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  const handleNewEntry = () => {
    setSubmissionSuccessful(false);
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

      {submissionSuccessful ? (
        <div className="form-container">
          <p
            style={{
              alignSelf: "center",
              fontFamily: "Poppins",
              fontSize: "18px",
              marginBottom: "20px",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            Congrats on your new sighting!{" "}
            <span
              onClick={handleNewEntry}
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Submit another entry
            </span>{" "}
            or{" "}
            <Link to="/birdCards" style={{ color: "blue" }}>
              view it in your sightings collection
            </Link>
            .
          </p>
        </div>
      ) : (
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
            Enter bird information below to create a new sighting.
          </p>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="species"></label>
                <input
                  type="text"
                  id="species"
                  name="species"
                  placeholder="What species does this bird belong to?"
                  value={species}
                  onChange={handleSpeciesChange}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="date"></label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  placeholder="What date did you spot this bird?"
                  value={date}
                  onChange={handleDateChange}
                  className="form-input"
                />
              </div>
              <div>
                <select
                  value={birdWas}
                  name="birdWas"
                  onChange={handleBirdWasChange}
                  className="form-input"
                >
                  <option disabled value="">
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
              <div>
                <select
                  value={difficulty}
                  name="difficulty"
                  onChange={handleDifficultyChange}
                  className="form-input"
                >
                  <option disabled value="">
                    How difficult was it to spot this bird?
                  </option>
                  <option value="Easy">Easy</option>
                  <option value="Moderately Difficult">
                    Moderately Difficult
                  </option>
                  <option value="Difficult">Difficult</option>
                </select>
              </div>
              <button type="submit" className="form-button">
                Submit
              </button>
            </form>
          </div>
        </>
      )}

      <ErrorPopup
        message={errorMessage || ""}
        visible={Boolean(errorMessage)}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};

export default CreateCard;
