const router = require('express').Router();
const ctrl = require('../controllers/appointments');

// List all appointments
router.get('/', ctrl.index);

// Show form for new appointment
router.get('/new', ctrl.new);

// Create appointment
router.post('/', ctrl.create);

// Show single appointment
router.get('/:id', ctrl.show);

// Show edit form
router.get('/:id/edit', ctrl.edit);

// Update appointment
router.put('/:id', ctrl.update);

// Delete appointment
router.delete('/:id', ctrl.destroy);

module.exports = router;
