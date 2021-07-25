const mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_ACCESS;
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connection established.");
  })
  .catch((err) => {
    console.log("DB connection error: ", err);
  });
