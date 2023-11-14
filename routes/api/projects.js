const express = require("express");
const projects = require("../../models/projects");
const { v4 } = require("uuid");
const { HttpError } = require("../../helpers");

const router = express.Router();

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

router.post("/", (req, res) => {
  const newProject = { ...req.body, id: v4() };
  projects.push(newProject);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newProject,
    },
  });
});

module.exports = router;
