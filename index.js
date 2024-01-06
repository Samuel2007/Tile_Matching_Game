require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
var cors = require("cors");
const mongoString = process.env.DATABASE_URL;
const app = express();

app.use(cors());
app.use("/api", routes);

const port = process.env.PORT || 5000;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.json());
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("tile_matching_game_frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname + "/tile_matching_game_frontend/build/index.html")
    );
  });
}

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
