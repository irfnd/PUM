const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
