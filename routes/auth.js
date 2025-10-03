const router = require('express').Router();
const ctrl = require('../controllers/auth');

router.get('/signup', ctrl.getSignup);
router.post('/signup', ctrl.postSignup);

router.get('/login', ctrl.getLogin);
router.post('/login', ctrl.postLogin);

router.post('/logout', ctrl.logout);
router.get('/logout', ctrl.logout);

module.exports = router;