// controllers/dashboards.js — role-based dashboards

const Appointment = require('../models/Appointment');

exports.patient = async (req, res) => {
  const patientId = req.session?.user?.patientId;
  const appts = patientId
    ? await Appointment.find({ patient_id: patientId })
        .populate('doctor_id')
        .sort({ datetime: -1 })
        .limit(10)
    : [];
  return res.render('dashboards/patient', { appts });
};

exports.doctor = async (req, res) => {
  const doctorId = req.session?.user?.doctorId;
  const appts = doctorId
    ? await Appointment.find({ doctor_id: doctorId })
        .populate('patient_id')
        .sort({ datetime: -1 })
        .limit(10)
    : [];
  return res.render('dashboards/doctor', { appts });
};
