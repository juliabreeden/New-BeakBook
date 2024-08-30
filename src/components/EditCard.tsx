// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { CardData } from "../App";

// interface EditCardProps {
//   cards: CardData[];
//   onSubmit: (updatedCard: CardData) => void;
// }

// const EditCard: React.FC<EditCardProps> = ({ cards, onSubmit }) => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const cardData = cards.find((card) => card._id === id);

//   useEffect(() => {
//     if (!cardData) {
//       console.error(`Card with id ${id} not found`);
//       navigate("/birdCards"); 
//     }
//   }, [cardData, id, navigate]);

//   const [species, setSpecies] = useState(cardData?.species || "");
//   const [date, setDate] = useState(cardData?.date || "");
//   const [birdWas, setBirdWas] = useState(cardData?.birdWas || "");
//   const [difficulty, setDifficulty] = useState(cardData?.difficulty || "");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (cardData) {
//       const updatedCard = { ...cardData, species, date, birdWas, difficulty };
//       onSubmit(updatedCard);
//       navigate("/birdCards");
//     }
//   };

//   const handleCancel = () => {
//     navigate("/birdCards");
//   };

//   if (!cardData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={species}
//         onChange={(e) => setSpecies(e.target.value)}
//         placeholder="Species"
//       />
//       <input
//         type="text"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         placeholder="Date"
//       />
//       <select value={birdWas} onChange={(e) => setBirdWas(e.target.value)}>
//         <option value="Eating at a feeder">Eating at a feeder</option>
//         {/* Add other options */}
//       </select>
//       <select
//         value={difficulty}
//         onChange={(e) => setDifficulty(e.target.value)}
//       >
//         <option value="Easy">Easy</option>
//         {/* Add other options */}
//       </select>
//       <button type="submit">Save</button>
//       <button type="button" onClick={handleCancel}>
//         Cancel
//       </button>
//     </form>
//   );
// };

// export default EditCard;
