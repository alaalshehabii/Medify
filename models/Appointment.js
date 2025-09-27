const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  patient_id: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor_id:  { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  datetime:   { type: Date, required: true },
  mode:       { type: String, enum: ['video', 'clinic'], default: 'clinic' },
  status:     { type: String, enum: ['upcoming', 'completed', 'canceled'], default: 'upcoming' },
  notes:      String
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
