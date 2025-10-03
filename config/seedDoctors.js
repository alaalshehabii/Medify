const Doctor = require('../models/Doctor');

const DOCTORS = [
  { fullName: 'Dr. Amelia Holloway', specialty: 'Pediatrics',           photoUrl: '/img/the-doctor-will-see-you-now.jpg', isActive: true },
  { fullName: 'Dr. Noor Malik',      specialty: 'Cardiology',           photoUrl: '/img/doctor-noor.jpg',                 isActive: true },
  { fullName: 'Dr. Ethan Merrick',   specialty: 'Orthopedics',          photoUrl: '/img/doctor-ethan.jpg',                isActive: true },
  { fullName: 'Dr. Jared Colson',    specialty: 'Dermatology',          photoUrl: '/img/doctor-jared.jpg',                isActive: true },
  { fullName: 'Dr. Calvin Pierce',   specialty: 'Neurology',            photoUrl: '/img/smiling-doctor.jpg',              isActive: true },
  { fullName: 'Dr. Casey Hart',      specialty: 'ENT (Otolaryngology)', photoUrl: '/img/doctor-casey.jpg',                isActive: true },
];

async function seedDoctorsUpsert() {
  let changed = 0;
  for (const d of DOCTORS) {
    const res = await Doctor.updateOne(
      { fullName: d.fullName },
      { $set: d },
      { upsert: true }
    );
    if (res.upsertedCount || res.modifiedCount) changed++;
  }
  return changed;
}

module.exports = { seedDoctorsUpsert, DOCTORS };