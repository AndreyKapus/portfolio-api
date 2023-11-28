const { User } = require("../models/users");
const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    email: newUser.email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
