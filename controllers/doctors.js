// controllers/doctors.js
const Doctor = require('../models/Doctor');

exports.index = async (_req, res) => {
  const doctors = await Doctor.find({}).sort('fullName').lean(); // show all doctors
  res.render('doctors/index', { title: 'Our Doctors', doctors });
};