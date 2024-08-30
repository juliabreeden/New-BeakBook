import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/home", (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({
    username,
    password,
  });

  newUser
    .save()
    .then((savedUser) => {
      console.log("User saved to the database");
      res.cookie("userId", savedUser._id, { httpOnly: true, overwrite: true });
      res.status(201).send("User created successfully");
    })
    .catch((error) => {
      console.error("Error saving user:", error);
      res.status(500).send("Error saving user");
    });
});

export default router;
