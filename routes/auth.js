// routes/auth.js — login / logout / signup (patient & doctor)
const router = require('express').Router();
const {
  viewLogin,
  login,
  logout,
  viewSignupPatient,
  signupPatient,
  viewSignupDoctor,
  signupDoctor
} = require('../controllers/auth');

router.get('/login', viewLogin);
router.post('/login', login);

router.get('/logout', logout);

router.get('/signup/patient', viewSignupPatient);
router.post('/signup/patient', signupPatient);

router.get('/signup/doctor', viewSignupDoctor);
router.post('/signup/doctor', signupDoctor);

module.exports = router;
