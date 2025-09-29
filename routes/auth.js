const router = require('express').Router();
const auth = require('../controllers/auth');

// LOGIN / LOGOUT
router.get('/login', auth.viewLogin);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

// PATIENT SIGNUP ONLY
router.get('/signup', auth.viewSignupPatient);       
router.post('/signup', auth.signupPatient);

module.exports = router;