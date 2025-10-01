// models/Appointment.js
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    userId:     { type: String, required: true, index: true },
    doctorKey:  { type: String, required: true, index: true },
    doctorName: { type: String, required: true },
    start:      { type: Date,   required: true, index: true },
    end:        { type: Date,   required: true },
  },
  { timestamps: true }
);

// Prevent two users booking the same doctor at the same start time
AppointmentSchema.index({ doctorKey: 1, start: 1 }, { unique: true, name: 'unique_doctor_slot' });

module.exports = mongoose.model('Appointment', AppointmentSchema);
