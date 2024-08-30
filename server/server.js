import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import signUpRouter from "./routes/signupRoute.js";
import loginRouter from "./routes/loginRoute.js";
import createCardRouter from "./routes/createCardRoute.js";
import Card from "./models/cardModel.js";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Manually define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Use express static
app.use(express.static(path.join(__dirname, "src")));

// Initialize environment variables
dotenv.config();

const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(session({
//   secret: 'jG0qZ456969696969',
//   resave: true,
//   saveUninitialized: false,
//   cookie: {
//     secure: false
//   },
// }));
app.use(express.static(__dirname + "/src"));
app.use(signUpRouter);
app.use(loginRouter);
app.use(createCardRouter);

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      throw new Error("Invalid prompt");
    }

    // Add your specific instructions to the prompt
    const detailedPrompt = `Based on the following information, provide the names of the top 4 bird species that could match the description. Only respond with the names of the birds in order of likelihood, and don't include any other text. Here is the bird information: ${prompt}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: detailedPrompt },
      ],
      max_tokens: 60,
      temperature: 0.4,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    });

    res.send(completion.choices[0].message.content);
  } catch (error) {
    console.error("Error during OpenAI API call:", error);
    res.status(500).send("Internal Server Error");
  }
});

console.log("Using API key:", process.env.OPENAI_API_KEY);

app.get("/cards", async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const cards = await Card.find({ userId }).exec();
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/cards/:id", (req, res) => {
  const { id } = req.params;
  const updatedCard = req.body; // Assuming the updated card data is sent in the request body

  Card.findByIdAndUpdate(id, updatedCard, { new: true })
    .then((updatedCard) => {
      res.status(200).json(updatedCard);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update the card." });
    });
});

app.delete("/cards/:id", (req, res) => {
  const { id } = req.params;
  Card.findByIdAndDelete(id)
    .then(() => {
      res.status(200);
      console.log("card deleted");
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete card." });
    });
});

// app.use('/signup', signUpRouter);
// app.use('/login', loginRouter);
// app.use('/createCard', createCardRouter);

app.get("/home", (req, res) => {
  res.send("home page ");
});

app.get("/test", (req, res) => {
  res.send("hello");
});

app.get("/test-cookie", (req, res) => {
  res.cookie("testCookie", "testValue");
  res.send("Test cookie set!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

app.listen(3000, function () {
  console.log("express serving running on 3000");
});
