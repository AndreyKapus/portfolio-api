const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    email: newUser.email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
