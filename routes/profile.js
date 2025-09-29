const router = require('express').Router();
const isSignedIn = require('../middleware/isSignedIn');
const profile = require('../controllers/profile');

router.get('/', isSignedIn, profile.view);
router.post('/', isSignedIn, profile.update);

module.exports = router;
