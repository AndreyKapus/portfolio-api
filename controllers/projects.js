const Project = require("../models/project");
const { v4 } = require("uuid");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const result = await Project.find();
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
  const result = await Project.create(req.body);
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

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
