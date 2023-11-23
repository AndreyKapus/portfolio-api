const mongoose = require("mongoose");
const app = require("./app");

//1GIoUHhuEW82MTIV

const DB_HOST =
  "mongodb+srv://andriik:1GIoUHhuEW82MTIV@cluster0.iutekrl.mongodb.net/portfolio-api";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3001);
    console.log("started at localhost 3001");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
