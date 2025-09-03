const express = require("express");
const router = express();
const {
  validatPost,
  validatPut,
} = require("../middlewares/recipeValidator.js");

router.get("/", (req, res) => {
  res.send("getting all recipes");
});
router.get("/:id", (req, res) => {});

router.post("/", validatPost, (req, res) => {});

router.put("/:id", validatPut, (req, res) => {});

router.delete("/:id", (req, res) => {});

router.get("/stats", (req, res) => {
  res.send("getting stats");
});
module.exports = router;
