const { User } = require("../db/setup");

async function validateUser(req, res, next) {
  const maybeUser = User.build(req.body);
  try {
    await maybeUser.validate();
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = { validateUser };
