// config/seedDoctors.js
const Doctor = require('../models/Doctor');

const DOCTORS = [
  { fullName: 'Dr. Amelia Holloway', specialty: 'Pediatrics',            photoUrl: '/img/doc-amelia.jpg', isActive: true },
  { fullName: 'Dr. Noor Malik',      specialty: 'Cardiology',            photoUrl: '/img/doc-noor.jpg',   isActive: true },
  { fullName: 'Dr. Ethan Merrick',   specialty: 'Orthopedics',           photoUrl: '/img/doc-ethan.jpg',  isActive: true },
  { fullName: 'Dr. Jared Colson',    specialty: 'Dermatology',           photoUrl: '/img/doc-jared.jpg',  isActive: true },
  { fullName: 'Dr. Calvin Pierce',   specialty: 'Neurology',             photoUrl: '/img/doc-calvin.jpg', isActive: true },
  { fullName: 'Dr. Casey Hart',      specialty: 'ENT (Otolaryngology)',  photoUrl: '/img/doc-casey.jpg',  isActive: true },
];

/**
 * Upsert each doctor by fullName so running multiple times is safe.
 * Returns how many docs were created/modified.
 */
async function seedDoctorsUpsert() {
  let changed = 0;
  for (const d of DOCTORS) {
    const res = await Doctor.updateOne({ fullName: d.fullName }, { $set: d }, { upsert: true });
    if (res.upsertedCount || res.modifiedCount) changed++;
  }
  return changed;
}

module.exports = { seedDoctorsUpsert, DOCTORS };