const mongoose = require("mongoose");
const { Schema } = mongoose;

const mhsSchema = new Schema({
  nama: { type: String, default: "-" },
  npm: { type: String, default: "-" },
  id_ktp: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Mahasiswa", mhsSchema);
