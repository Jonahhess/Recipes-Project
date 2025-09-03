const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../data/recipes.json");
const recipes = JSON.parse(readFileSync(filePath));

const getRecipes = () => {
  return recipes;
};

const getRecipeByIndex = (index) => {
  return recipes[index];
};

const addRecipe = (recipe) => {
  recipes.push(recipe);
  writeFileSync(filePath, JSON.stringify(recipes));
};

const updateRecipe = (index, modifiedRecipe) => {
  recipes[index] = modifiedRecipe;
  writeFileSync(filePath, JSON.stringify(recipes));
};

const deleteRecipe = (index) => {
  recipes.splice(index, 1);
  writeFileSync(filePath, JSON.stringify(recipes));
};
module.exports = {
  getRecipes,
  getRecipeByIndex,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
