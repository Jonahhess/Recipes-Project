const PORT = 3005;

const express = require("express");
const morgan = require("morgan");

const recipeRouter = require("./routes/recipeRouter.js");
const authRouter = require("./routes/authRouter.js");

const { sequelize } = require("./db/setup.js");
const app = express();
app.use(express.json());
app.use(morgan("combined"));
app.use("/api/auth", authRouter);
app.use("/api/recipes", recipeRouter);

// routes
app.get("/", (req, res) => {
  res.send("Welcome to the website");
});

sequelize
  .sync({ force: true }) // or { force: true } for dropping/recreating tables
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database:", err);
  });

// Error Handling Middleware (always in the END)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});
