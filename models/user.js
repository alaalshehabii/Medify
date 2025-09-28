// models/User.js — user identity for login (maps to either a Patient or a Doctor)

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['patient', 'doctor'], required: true },
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient' }, // set when role === 'patient'
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor' }    // set when role === 'doctor'
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
