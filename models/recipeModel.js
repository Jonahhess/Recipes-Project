const { readFileSync } = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../data/recipes.json");
const recipes = JSON.parse(readFileSync(filePath));

module.exports = recipes;
