const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3005;

// imports
// helmet
// cors
const morgan = require("morgan");
app.use(morgan("combined"));

// my imports

// my middleware
// my routes
const recipeRouter = require("./routes/recipeRouter.js");
app.use("/api/recipes", recipeRouter);
// middleware

// routes
app.get("/", (req, res) => {
  res.send("Welcome to the website");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// Error Handling Middleware (always in the END)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});
