const express = require("express");
const projects = require("../../data/projects/projects");

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
module.exports = router;
