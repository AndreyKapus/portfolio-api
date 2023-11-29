const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const projectSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    techs: {
      type: String,
      required: true,
    },
    descr: {
      type: String,
      required: true,
    },
    team: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

projectSchema.post("save", handleMongooseError);

const Project = model("project", projectSchema);

module.exports = Project;
