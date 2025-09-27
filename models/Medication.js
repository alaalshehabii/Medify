const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  form:     { type: String, trim: true },     // tablet, capsule, syrup…
  strength: { type: String, trim: true }      // e.g., 500 mg
}, { timestamps: true });

module.exports = mongoose.model('Medication', medicationSchema);
