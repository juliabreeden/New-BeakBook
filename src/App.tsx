import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import CreateCard from "../src/components/CreateCard";
import IdentifyBird from "../src/components/IdentifyBird";
import Navbar from "../src/components/NavBar";
import Home from "../src/components/Home";
import LoginForm from "../src/components/Login";
import SignUpForm from "../src/components/Signup";
import Card from "../src/components/Card";
// import EditCard from "../src/components/EditCard";
import heroBackground from "./assets/heroBackground.jpg";
import "../src/styles/styles.css";

export interface CardData {
  _id: string;
  species: string;
  date: string;
  birdWas: string;
  difficulty: string;
}

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  const addCard = (newCard: Omit<CardData, "_id">) => {
    const newCardWithId = { ...newCard, _id: String(Math.random()) };
    setCards((prevCards) => [...prevCards, newCardWithId]);
  };

  const editCard = (updatedCard: CardData) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card._id === updatedCard._id ? updatedCard : card,
      ),
    );
  };

  const deleteCard = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Router>
        <RoutesWithNavbar
          cards={cards}
          addCard={addCard}
          editCard={editCard}
          deleteCard={deleteCard}
        />
      </Router>
    </div>
  );
};

interface RoutesWithNavbarProps {
  cards: CardData[];
  addCard: (newCard: Omit<CardData, "_id">) => void;
  editCard: (updatedCard: CardData) => void;
  deleteCard: (cardId: string) => void;
}

const RoutesWithNavbar: React.FC<RoutesWithNavbarProps> = ({
  cards,
  addCard,
  editCard,
  deleteCard,
}) => {
  const location = useLocation();
  const showNavbar = !["/", "/signup"].includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateCard onSubmit={addCard} />} />
        <Route path="/identify" element={<IdentifyBird />} />
        <Route
          path="/birdCards"
          element={
            <Card cards={cards} editCard={editCard} deleteCard={deleteCard} />
          }
        />
        {/* <Route
          path="/edit/:id"
          element={<EditCard cards={cards} onSubmit={editCard} />}
        /> */}
      </Routes>
    </div>
  );
};

export default App;
