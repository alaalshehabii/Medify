const router = require('express').Router();
const ctrl = require('../controllers/home');

router.get('/', ctrl.index);

module.exports = router;