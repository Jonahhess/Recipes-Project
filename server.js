const express = require("express");
const app = express();
const PORT = 3006;

// imports
// helmet
// cors

// my imports

// my middleware
// my routes

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to the website");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
