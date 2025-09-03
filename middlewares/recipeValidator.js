const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const recipePost = require("../schemas/recipeInputSchema.json");
const recipePut = require("../schemas/recipeSchema.json");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Validators
const postSchema = ajv.compile(recipePost);
const putSchema = ajv.compile(recipePut);

const validatePost = (req, res, next) => {
  if (!postSchema(req.body)) {
    return res.status(400).json({ errors: postSchema.errors });
  }
  next();
};

const validatePut = (req, res, next) => {
  if (!putSchema(req.body)) {
    return res.status(400).json({ errors: putSchema.errors });
  }
  next();
};

const validateId = (req, res, next) => {
  if (!Number.isInteger(Number(req.params.id))) {
    return res.status(400).send("ill formed request");
  }
  next();
};

module.exports = { validatePost, validatePut, validateId };
