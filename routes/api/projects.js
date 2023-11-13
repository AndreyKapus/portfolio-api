const express = require("express");
const projects = require("../../data/projects/projects");
const { v4 } = require("uuid");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      result: projects,
    },
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const result = projects.find((item) => item.id === id);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `project with id: ${id} not found`,
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
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
