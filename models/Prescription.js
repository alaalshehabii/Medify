const mongoose = require('mongoose');
const { Schema } = mongoose;

const prescriptionSchema = new Schema({
  patient_id: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  medication_id: {
    type: Schema.Types.ObjectId,
    ref: 'Medication',
    required: true
  },
  dosage: {
    type: String,
    trim: true
  }, // e.g., "1 tablet"
  frequency: {
    type: String,
    trim: true
  }, // e.g., "twice daily"
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  refills: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
