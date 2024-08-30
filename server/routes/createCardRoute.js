import express from "express";
import Card from "../models/cardModel.js";

const router = express.Router();


router.post("/createCard", async (req, res) => {
  console.log("cookies", req.cookies);
  try {
    const userId = Number(req.cookies.userId);
    const species = req.body.species;
    const date = req.body.date;
    const location = req.body.location;
    const birdWas = req.body.birdWas;
    const difficulty = req.body.difficulty;

    const newCard = new CardModel({
      species,
      date,
      location,
      birdWas,
      difficulty,
      userId,
    });

    newCard
      .save()
      .then((savedCard) => {
        console.log("Card saved to the database");
        console.log("newCard is", savedCard);
        res.sendStatus(200); // Send success status
      })
      .catch((error) => {
        console.error("Error saving card:", error);
        res.sendStatus(500); // Send error status
      });
  } catch (error) {
    console.error("Error saving card:", error);
    res.sendStatus(500); // Send error status
  }
});

export default router;
