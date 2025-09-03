const express = require("express");
const router = express.Router();
const {
  validatePost,
  validatePut,
} = require("../middlewares/recipeValidator.js");

router.get("/", (req, res) => {
  res.send("getting all recipes");
});
router.get("/:id", (req, res) => {
  res.send("getting recipe by id");
});

router.post("/", validatePost, (req, res) => {
  res.send("posting valid recipe");
});

router.put("/:id", validatePut, (req, res) => {
  res.send("putting valid recipe");
});

router.delete("/:id", (req, res) => {
  res.send("deleting a recipe by id");
});

router.get("/stats", (req, res) => {
  res.send("getting stats");
});
module.exports = router;
