const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  title: String,
  image: String,
  imageId: String,
});

module.exports = mongoose.model("Image", imageSchema);
