const mongoose = require('mongoose');
const { Schema } = mongoose;

const MedicationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    dosage: { type: String, required: true, trim: true }, // e.g., "500mg"
    timesPerDay: { type: Number, required: true, min: 1, max: 6 },
    timing: {
      type: [String],
      enum: ['before food', 'after food', 'before bed', 'morning', 'afternoon', 'evening'],
      default: ['morning']
    },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

MedicationSchema.index({ user: 1, name: 1 });

module.exports = mongoose.models.Medication || mongoose.model('Medication', MedicationSchema);