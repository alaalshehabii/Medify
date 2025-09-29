// models/User.js
// Central auth record for both patients and doctors.
// Stores unique email, password hash, role, and optional pointers
// to the associated Patient or Doctor document.

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // Normalized unique email for login
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,   // normalizes case so uniqueness works as expected
      trim: true,
    },

    // Bcrypt hash (NOT the plain password)
    // Note: kept selectable because your controllers read it directly.
    passwordHash: {
      type: String,
      required: true,
    },

    // Who is this user in the system?
    role: {
      type: String,
      enum: ['patient', 'doctor', 'admin'],
      required: true,
    },

    // Optional links to domain records
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
    doctorId:  { type: Schema.Types.ObjectId, ref: 'Doctor' },

    // Optional display name (handy for nav)
    displayName: { type: String, trim: true },
  },
  { timestamps: true }
);

// Hide passwordHash when using res.json() (lean() bypasses this)
userSchema.set('toJSON', {
  transform(_doc, ret) {
    delete ret.passwordHash;
    return ret;
  }
});

// Helpful virtual to show which domain ID is active
userSchema.virtual('subjectId').get(function subjectId() {
  return this.role === 'doctor' ? this.doctorId : this.patientId;
});

// Optional: small helper to set displayName automatically
userSchema.pre('save', function setDisplayName(next) {
  if (!this.displayName && this.email) {
    this.displayName = this.email.split('@')[0];
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
