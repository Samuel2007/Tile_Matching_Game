const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  time: {
    required: true,
    type: String,
  },
  level: {
    required: true,
    type: String,
  },
  customDifficulty: {
    required: false,
    type: Number,
  },
});

module.exports = mongoose.model("Data", dataSchema);
