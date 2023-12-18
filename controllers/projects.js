const Project = require("../models/project");
const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");
const { HttpError, ctrlWrapper } = require("../helpers");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const getAll = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Project.find({}, "-createAt -updateAt", { skip, limit });
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Project.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const add = async (req, res, next) => {
  const avatarUrl = path.join("avatars", "avatar.jpg");

  const result = await Project.create({ ...req.body, avatarUrl });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: result,
    },
  });
};

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Project.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Project.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Deleted",
  });
};

const updateAvatar = async (req, res) => {
  const { id } = req.params;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarUrl = path.join("avatars", filename);
  await Project.findByIdAndUpdate(id, { avatarUrl });

  res.json({
    avatarUrl,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateAvatar: ctrlWrapper(updateAvatar),
};
