import express from "express";
import User from "../models/userModel.js"; 

const router = express.Router();


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database by username and password
    const user = await User.findOne({ username, password });

    if (user) {
      console.log("user id is:", user._id);
      // Store the user's _id in the session

      res.cookie("userId", JSON.stringify(user._id), {
        httpOnly: false,
        overwrite: true,
      });

      res.status(200).json({ message: "Login successful!" });
    } else {
      // If the user is not found, send an error response
      res.status(401).json({ message: "Invalid credentials!" });
    }
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ message: "Server error!" });
  }
});

export default router;
