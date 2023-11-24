const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  img: String,
  name: String,
  techs: String,
  descr: String,
});

const Project = model("project", projectSchema);

module.exports = Project;
