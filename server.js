require("dotenv").config();

const express = require("express");
const app = express();

const posts = [
  {
    kwame: "i like basketball",
    jamal: "i like tennis",
  },
];

const PORT = process.env.PORT;

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.listen(PORT, () => {
  console.log(`serving on port:${PORT}`);
});
