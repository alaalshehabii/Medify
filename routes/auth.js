// routes/auth.js — login / logout / signup (patient & doctor)

const router = require('express').Router();
const auth = require('../controllers/auth');

router.get('/login', auth.viewLogin);
router.post('/login', auth.login);

router.get('/logout', auth.logout);

router.get('/signup/patient', auth.viewSignupPatient);
router.post('/signup/patient', auth.signupPatient);

router.get('/signup/doctor', auth.viewSignupDoctor);
router.post('/signup/doctor', auth.signupDoctor);

module.exports = router;