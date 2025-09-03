const recipes = require("../models/recipeModel");

const getAllRecipes = () => {
  return recipes;
};

const getStats = () => {
  const totalRecipes = recipes.length;
  const avgCookingTime =
    recipes.map((a) => a.cookingTime).reduce((a, b) => a + b) / totalRecipes;
  const numRecipesByDifficulty = recipes.reduce((ac, cur) => {
    ac[cur.difficulty] = ac[cur.difficulty]
      ? (ac[cur.difficulty] += 1)
      : (ac[cur.difficulty] = 1);
    return ac;
  }, {});

  return { totalRecipes, avgCookingTime, numRecipesByDifficulty };
};

module.exports = { getAllRecipes, getStats };
