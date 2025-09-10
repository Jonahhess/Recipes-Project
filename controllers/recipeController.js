let counter = 4;

const getAllRecipes = () => {
  return recipes.getRecipes();
};

const getStats = () => {
  const allRecipes = recipes.getRecipes();
  const totalRecipes = allRecipes.length;
  const avgCookingTime =
    allRecipes.map((a) => a.cookingTime).reduce((a, b) => a + b) / totalRecipes;
  const numRecipesByDifficulty = allRecipes.reduce((ac, cur) => {
    ac[cur.difficulty] = ac[cur.difficulty]
      ? (ac[cur.difficulty] += 1)
      : (ac[cur.difficulty] = 1);
    return ac;
  }, {});

  return { totalRecipes, avgCookingTime, numRecipesByDifficulty };
};

const getRecipeById = (id) => {
  if (!id) {
    throw new Error("no id found");
  }

  const recipe = recipes.getRecipes().find((recipe) => recipe.id === id);

  if (!recipe) {
    throw new Error("recipe not found");
  }

  return recipe;
};

const addRecipe = (recipeInput) => {
  if (!recipeInput) {
    throw new Error("no recipe input");
  }

  const id = String(++counter); // confirm unique
  const createdAt = new Date(Date.now()).toUTCString();

  const recipe = { ...recipeInput, id, createdAt };
  recipes.addRecipe(recipe);
  return recipe;
};

const updateRecipeById = (id, modifiedRecipe) => {
  if (!id) {
    throw new Error("no id here");
  }

  if (!modifiedRecipe) {
    throw new Error("no modified recipe");
  }

  const storedRecipeIndex = recipes
    .getRecipes()
    .findIndex((recipe) => recipe.id === id);
  if (storedRecipeIndex < 0 || storedRecipeIndex >= recipes.length) {
    throw new Error("could not find recipe index");
  }

  const storedRecipe = recipes.getRecipeByIndex(storedRecipeIndex);
  if (!storedRecipe) {
    throw new Error("recipe not found");
  }

  if (!modifiedRecipe.id || !modifiedRecipe.createdAt) {
    throw new Error("missing generated fields in modified recipe");
  }

  if (
    id !== modifiedRecipe.id ||
    storedRecipe.createdAt !== modifiedRecipe.createdAt
  ) {
    throw new Error("cannot change immutable fields");
  }

  recipes.updateRecipe(storedRecipeIndex, modifiedRecipe);
  return modifiedRecipe;
};

const deleteRecipeById = (id) => {
  if (!id) {
    throw new Error("no id to delete");
  }

  const storedRecipeIndex = recipes
    .getRecipes()
    .findIndex((recipe) => recipe.id === id);
  if (storedRecipeIndex < 0 || storedRecipeIndex >= recipes.length) {
    throw new Error("could not find recipe index");
  }

  recipes.deleteRecipe(storedRecipeIndex);
  return storedRecipeIndex;
};

module.exports = {
  getAllRecipes,
  getStats,
  getRecipeById,
  addRecipe,
  updateRecipeById,
  deleteRecipeById,
};
