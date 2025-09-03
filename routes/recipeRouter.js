const express = require("express");
const router = express.Router();
const {
  validatePost,
  validatePut,
  validateId,
} = require("../middlewares/recipeValidator.js");
const {
  getAllRecipes,
  getStats,
  getRecipeById,
  addRecipe,
  updateRecipeById,
  deleteRecipeById,
} = require("../controllers/recipeController.js");

// static routes
router.get("/", (req, res) => {
  const allRecipes = getAllRecipes();
  res.send(allRecipes);
});

router.get("/stats", (req, res) => {
  const stats = getStats();
  res.send(stats);
});

router.post("/", validatePost, (req, res) => {
  const post = addRecipe(req.body);
  res.send(post);
});

// dynamic routes
router.get("/:id", validateId, (req, res) => {
  const storedRecipe = getRecipeById(req.params.id);
  res.send(storedRecipe);
});

router.delete("/:id", validateId, (req, res) => {
  const deletion = deleteRecipeById(req.params.id);
  res.send(deletion);
});

router.put("/:id", validateId, validatePut, (req, res) => {
  const update = updateRecipeById(req.params.id, req.body);
  res.send(update);
});

module.exports = router;
