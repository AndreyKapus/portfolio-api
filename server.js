const mongoose = require("mongoose");
const app = require("./app");

//1GIoUHhuEW82MTIV

const { DB_HOST } = process.env;

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
