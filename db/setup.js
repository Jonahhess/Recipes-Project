// db
const database = "test";
const user = "postgres";
const password = "ferventlycreatinghammer";
const host = "localhost";
const port = 5432;

const { Sequelize, DataTypes } = require("@sequelize/core");
const { PostgresDialect } = require("@sequelize/postgres");
const sequelize = new Sequelize({
  database,
  user,
  password,
  host,
  port,
  dialect: PostgresDialect,
  logging: false,
});

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    validate: { len: [3, 30] },
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: { isEmail: true },
    allowNull: false,
  },
  password: { type: DataTypes.STRING },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE },
});

const Recipe = sequelize.define("Recipe", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  ingredients: { type: DataTypes.JSONB },
  instructions: { type: DataTypes.JSONB },
  cookingTime: { type: DataTypes.INTEGER },
  servings: { type: DataTypes.INTEGER },
  difficulty: { type: DataTypes.ENUM("easy", "medium", "hard") },
  imageUrl: { type: DataTypes.STRING, validate: { isUrl: true } },
  isPublic: { type: DataTypes.BOOLEAN, defaultValue: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE },
});

const Favorite = sequelize.define("Favorite", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: { type: DataTypes.UUID, allowNull: false },
  recipeId: { type: DataTypes.UUID, allowNull: false },
  createdAt: { type: DataTypes.DATE },
});

Recipe.hasMany(Favorite, { foreignKey: "recipeId" });
Recipe.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Recipe, { foreignKey: "userId" });
User.hasMany(Favorite, { foreignKey: "userId" });
Favorite.belongsTo(User, { foreignKey: "userId" });
Favorite.belongsTo(Recipe, { foreignKey: "recipeId" });

module.exports = { sequelize, User };
