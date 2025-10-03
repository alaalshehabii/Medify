const mongoose = require('mongoose');
const { Schema } = mongoose;

const AppointmentSchema = new Schema(
  {
    user:   { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true, index: true },
    startsAt: { type: Date, required: true, index: true },
    endsAt:   { type: Date, required: true },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

// 30-min normalization helper (called by controller)
AppointmentSchema.index({ doctor: 1, startsAt: 1 }, { unique: true });

module.exports = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);