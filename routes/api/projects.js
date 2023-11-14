const express = require("express");
const projects = require("../../models/projects");
const { v4 } = require("uuid");
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  techs: Joi.string().required(),
  descr: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
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
});

router.get("/:id", async (req, res, next) => {
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
});

router.post("/", async (req, res, next) => {
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
});

module.exports = router;
