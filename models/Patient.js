const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
  full_name: { type: String, required: true, trim: true },
  dob: { type: Date },
  allergies: [{ type: String }],
  phone: String,
  email: String
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
