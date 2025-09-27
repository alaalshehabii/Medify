const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
  full_name: { type: String, required: true, trim: true },
  specialty: String,
  license_number: String
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
