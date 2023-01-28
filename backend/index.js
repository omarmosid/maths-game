const express = require("express");
var cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // enable cors for all

const PORT = process.env.PORT || 5000;

// const in memory data
const scores = [];

const getScores = () => {
  // todo sort scores descending order
  const sortedScores = scores;
  return sortedScores;
};

const addScore = (user, score) => {
  // Normally you'd write your database operations here
  // But in our case we will write to an in memory array that lives in the server
  scores.push({
    uuid: uuid(),
    user: user,
    score: score,
  });
};

app.get("/", (req, res) => {
  return res.status(200).send({
    msg: "Hello World",
  });
});

app.get("/scores", (req, res) => {
  const sortedScores = getScores();
  return res
    .status(200)
    .set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    })
    .send(sortedScores);
});

app.post("/scores", (req, res) => {
  const newScore = req.body;
  addScore(newScore.user, newScore.score);
  return res.status(201).send(newScore);
});

app.listen(PORT, () => {
  console.log(`Server started and listening on PORT ${PORT}`);
});
