const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../data/recipes.json");

let recipes = [];
try {
  recipes = JSON.parse(readFileSync(filePath));
} catch (err) {
  console.error("Error reading recipes file:", err);
  recipes = [];
}

const getRecipes = () => {
  return recipes;
};

const getRecipeByIndex = (index) => {
  return recipes[index];
};

const addRecipe = (recipe) => {
  recipes.push(recipe);
  try {
    writeFileSync(filePath, JSON.stringify(recipes));
  } catch (err) {
    console.error("Error writing recipes file:", err);
  }
};

const updateRecipe = (index, modifiedRecipe) => {
  recipes[index] = modifiedRecipe;
  try {
    writeFileSync(filePath, JSON.stringify(recipes));
  } catch (err) {
    console.error("Error writing recipes file:", err);
  }
};

const deleteRecipe = (index) => {
  recipes.splice(index, 1);
  try {
    writeFileSync(filePath, JSON.stringify(recipes));
  } catch (err) {
    console.error("Error writing recipes file:", err);
  }
};

module.exports = {
  getRecipes,
  getRecipeByIndex,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};
