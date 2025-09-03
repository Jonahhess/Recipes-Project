const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const recipeBase = require("./schemas/recipeBaseSchema.json");
const recipeSystem = require("./schemas/generatedFieldSchema.json");
const recipePost = require("./schemas/recipeInputSchema.json");
const recipePut = require("./schemas/recipeSchema.json");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Custom keyword: immutable fields
ajv.addKeyword({
  keyword: "immutable",
  schemaType: "boolean",
  validate: function immutableFn(schema, data, parentSchema, ctx) {
    if (!schema) return true;
    const field = ctx.parentDataProperty;
    const storedValue = ctx.rootData?.__original?.[field];
    if (storedValue !== undefined && data !== storedValue) {
      return false;
    }
    return true;
  },
  errors: true,
});

// Register schemas
ajv.addSchema(recipeBase);
ajv.addSchema(recipeSystem);
ajv.addSchema(recipePost);
ajv.addSchema(recipePut);

// Validators
const postSchema = ajv.getSchema("https://example.com/schemas/recipePost.json");
const putSchema = ajv.getSchema("https://example.com/schemas/recipePut.json");

// POST: system fields disallowed (manual or via `readOnly` keyword)
const validatePost = (req, res, next) => {
  if (!postSchema(req.body)) {
    return res.status(400).json({ errors: postSchema.errors });
  }
  next();
};

// PUT: system fields required but immutable
const validatePut = (req, res, next) => {
  const storedRecipe = db.recipes.findById(req.params.id);

  const valid = putSchema({ ...req.body, __original: storedRecipe });
  if (!valid) {
    return res.status(400).json({ errors: putSchema.errors });
  }
  next();
};

module.export = { validatePost, validatePut };
