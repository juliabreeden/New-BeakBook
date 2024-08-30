import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  species: String,
  date: String,
  birdWas: String,
  difficulty: String,
  userId: Number,
});

const CardModel = mongoose.model("Card", cardSchema);

export default CardModel;
