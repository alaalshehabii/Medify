const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  specialty: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  photo: { type: String, trim: true },   // /images/your-photo.jpg or https://...
  bio: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);
