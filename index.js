const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Sample array of users
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

// Secret key for JWT
const secretKey = "yourSecretKey";

app.use(bodyParser.json());

// Middleware to check if the request has a valid token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/", (req, res) => {
  res.send("HEllo WOrld");
});

app.get("/home", (req, res) => {
  res.send("HEllo.. this is home page");
});


app.get("/about", (req, res) => {
  res.send("HEllo.. this is home about");
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
