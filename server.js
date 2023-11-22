const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://andriik:z9cxRWF2RwBPfP3n@cluster0.iutekrl.mongodb.net/";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3001);
    console.log("connected");
  })
  .catch((error) => {
    console.log(error.massage);
    process.exit(1);
  });
