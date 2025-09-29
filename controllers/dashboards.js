// controllers/dashboards.js — simple personalized dashboards
const Appointment = require('../models/Appointment');

exports.patient = async (req, res) => {
  try {
    const patientId = req.session?.user?.patientId;
    const appts = await Appointment.find({ patient_id: patientId })
      .sort({ datetime: 1 })
      .limit(10)
      .lean();
    res.render('dashboards/patient', { appointments: appts });
  } catch (err) {
    console.error('Dashboard patient error:', err);
    res.render('dashboards/patient', { appointments: [] });
  }
};

exports.doctor = async (req, res) => {
  try {
    const doctorId = req.session?.user?.doctorId;
    const appts = await Appointment.find({ doctor_id: doctorId })
      .sort({ datetime: 1 })
      .limit(10)
      .lean();
    res.render('dashboards/doctor', { appointments: appts });
  } catch (err) {
    console.error('Dashboard doctor error:', err);
    res.render('dashboards/doctor', { appointments: [] });
  }
};
