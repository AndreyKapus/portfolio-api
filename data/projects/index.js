const fs = require("fs/promises");
const path = require("path");

const projectsPath = path.join(__dirname, "projects.json");

const getAll = async () => {
  const data = await fs.readFile(projectsPath, "utf-8");
  console.log(data);
  return JSON.parse(data);
};

module.exports = {
  getAll,
};
