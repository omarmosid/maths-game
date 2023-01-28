const scoreElement = document.querySelector("span#score");
const scoreBoardElement = document.querySelector("div.scoreboard");
const userElement = document.querySelector("input#user");
const API_ENDPOINT = "http://localhost:5000";

const startGame = () => {
  const score = generateRandomScore();
  setScore(score);
};

const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateRandomScore = () => {
  return randomIntFromInterval(1, 10000);
};

const setScore = (score) => {
  scoreElement.innerHTML = score;
};

const sendScore = async () => {
  const user = userElement.value;
  const score = scoreElement.innerHTML;
  console.log("user", user);
  console.log("score", score);
  fetch(`${API_ENDPOINT}/scores`, {
    method: "POST",
    body: {
      user: user,
      score: score,
    },
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    mode: "no-cors",
  }).then(() => renderScoreBoard());
};

const renderScoreBoard = async () => {
  const res = await fetch(`${API_ENDPOINT}/scores`, {
    method: "GET",
    mode: "no-cors",
  });
  const data = await res.json();

  console.log(res);
};
