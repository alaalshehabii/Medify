const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, minlength: 2 },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

// Allow same full name for different people (no email in this app)
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);