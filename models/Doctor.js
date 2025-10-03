const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    photoUrl: { type: String, default: '/img/doctor-placeholder.jpg' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);