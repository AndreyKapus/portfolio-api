const fs = require("fs/promises");
const path = require("path");
const { all } = require("../../routes/api/projects");
const { v4 } = require("uuid");

const projectsPath = path.join(__dirname, "projects.json");

const getAll = async () => {
  const data = await fs.readFile(projectsPath, "utf-8");
  console.log(data);
  return JSON.parse(data);
};

const getById = async (id) => {
  const allProjects = await getAll();
  const result = allProjects.find((item) => item.id === id);
  return result || null;
};

const addProject = async (data) => {
  const allProjects = await getAll();
  const newProject = {
    id: v4(),
    ...data,
  };

  allProjects.push(newProject);
  await fs.writeFile(projectsPath, JSON.stringify(allProjects, null, 2));
  return newProject;
};

const updateById = async (id, data) => {
  const allProjects = await getAll();
  const index = allProjects.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  allProjects[index] = { id, ...data };
  await fs.writeFile(projectsPath, JSON.stringify(allProjects, null, 2));
  return allProjects[index];
};

module.exports = {
  getAll,
  getById,
  addProject,
};
