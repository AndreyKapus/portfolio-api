const projects = require("../models/projects");
const { v4 } = require("uuid");
const { HttpError } = require("../helpers");
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  techs: Joi.string().required(),
  descr: Joi.string().required(),
});

const getAll = async (req, res, next) => {
  try {
    const result = await projects.getAll();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await projects.getById(id);
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
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await projects.addProject(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await projects.updateById(id, req.body);
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
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await projects.deleteById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
