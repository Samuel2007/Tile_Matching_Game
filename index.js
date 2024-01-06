require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
var cors = require("cors");
const mongoString = process.env.DATABASE_URL;
const app = express();

app.use(cors());
app.use("/api", routes);

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.json());

app.listen(3001, () => {
  console.log(`Server Started at ${3001}`);
});
