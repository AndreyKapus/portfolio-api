const fs = require("fs/promises");
const path = require("path");
const { all } = require("../../routes/api/projects");

const projectsPath = path.join(__dirname, "projects.json");

const getAll = async () => {
  const data = await fs.readFile(projectsPath, "utf-8");
  console.log(data);
  return JSON.parse(data);
};

const getById = async (id) => {
  const allProjects = await getAll();
  const result = allProjects.find((item) => item.id === id);
  return result;
};

module.exports = {
  getAll,
  getById,
};
