const Ajv = require("ajv");
const addFormats = require("ajv-formats");

// consider using the controller function getAllRecipes instead of direct access to the model
const recipes = require("../models/recipeModel.js");

const recipePost = require("../schemas/recipeInputSchema.json");
const recipePut = require("../schemas/recipeSchema.json");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Register schemas
ajv.addSchema(recipePost);
ajv.addSchema(recipePut);

// Validators
const postSchema = ajv.compile(recipePost);
const putSchema = ajv.compile(recipePut);

// POST: system fields disallowed (manual or via `readOnly` keyword)
const validatePost = (req, res, next) => {
  console.log(req.body);
  if (!postSchema(req.body)) {
    return res.status(400).json({ errors: postSchema.errors });
  }
  next();
};

// PUT: system fields required but immutable
const validatePut = (req, res, next) => {
  const storedRecipe = recipes.find((recipe) => recipe.id == req.params.id);
  if (!storedRecipe) {
    return res.status(400).send("recipe not found");
  }

  const { id, createdAt } = storedRecipe;

  if (id !== req.body.id || createdAt !== req.body.createdAt) {
    return res.status(400).send("cannot change immutable fields");
  }

  const valid = putSchema({ ...req.body });
  if (!valid) {
    return res.status(400).json({ errors: putSchema.errors });
  }
  next();
};

module.exports = { validatePost, validatePut };
