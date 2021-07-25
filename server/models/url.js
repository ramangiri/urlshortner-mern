const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: Date.now,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Url = mongoose.model("url", urlSchema);
module.exports = Url;
