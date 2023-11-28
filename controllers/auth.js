const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const { HttpError, ctrlWrapper } = require("../helpers");

const SECRET_KEY = `${process.env.SECRET_KEY}`;

const register = async (req, res) => {
  const { password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Wrong email or password");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Wrong email or password");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  res.json({
    token,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
