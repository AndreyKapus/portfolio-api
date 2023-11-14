const express = require("express");
const fs = require("fs").promises;
const moment = require("moment");
const cors = require("cors");

// const projectsRouter = require("./routes/api/projects");

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/projects", projectsRouter);

app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("server.log", `\n${method} ${url} ${date}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3001, () => {
  console.log("Example app listening on port 3001!");
});
