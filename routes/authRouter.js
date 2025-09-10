const express = require("express");
const { validateUser } = require("../middlewares/userValidator");
const router = express.Router();
const { User } = require("../db/setup.js");

// static routes
router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/test", validateUser, async (req, res) => {
  const user = await User.create(req.body);
  console.log(user);

  res.send("hello world");
});

module.exports = router;
