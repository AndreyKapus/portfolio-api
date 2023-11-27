const express = require("express");
const fs = require("fs").promises;
const moment = require("moment");
const cors = require("cors");
const dotenv = require("dotenv");

const authRouter = require("./routes/api/auth");
const projectsRouter = require("./routes/api/projects");

dotenv.config();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);

app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("server.log", `\n${method} ${url} ${date}`);
  next();
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(3001, () => {
//   console.log("Example app listening on port 3001!");
// });

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message,
  });
});

module.exports = app;
