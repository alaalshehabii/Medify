const router = require('express').Router();
const ctrl = require('../controllers/doctors');

// List all doctors
router.get('/', ctrl.index);

// Show form for new doctor
router.get('/new', ctrl.new);

// Create doctor
router.post('/', ctrl.create);

// Show single doctor
router.get('/:id', ctrl.show);

// Show edit form
router.get('/:id/edit', ctrl.edit);

// Update doctor
router.put('/:id', ctrl.update);

// Delete doctor
router.delete('/:id', ctrl.destroy);

module.exports = router;
