const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor'], required: true },
  profileRef: { type: Schema.Types.ObjectId, required: true } // points to Patient or Doctor
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
