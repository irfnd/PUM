const moment = require("moment");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const suhuSchema = new Schema({
  nama: { type: String, default: "-" },
  npm: { type: String, default: "-" },
  id_ktp: { type: String, required: true },
  suhu: { type: Number, required: true },
  isMhs: { type: Boolean, required: true, default: false },
  tanggal: { type: String, default: moment().format("DD-MM-YYYY") },
  jam: { type: String, default: moment().format("HH:mm:ss") },
  added: { type: Date, default: moment() },
});

module.exports = mongoose.model("Suhu", suhuSchema);
