require("dotenv").config();

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [
  {
    kwame: "i like basketball",
    jamal: "i like tennis",
  },
];

const PORT = process.env.PORT;

app.get("/posts", checkToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  //authenticate user

  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.SECRET_TOKEN);
  res.json({ accessToken: accessToken });
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`serving on port:${PORT}`);
});
