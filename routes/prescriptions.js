const router = require('express').Router();
const ctrl = require('../controllers/prescriptions');

// List all prescriptions
router.get('/', ctrl.index);

// Show form for new prescription
router.get('/new', ctrl.new);

// Create prescription
router.post('/', ctrl.create);

// Show single prescription
router.get('/:id', ctrl.show);

// Show edit form
router.get('/:id/edit', ctrl.edit);

// Update prescription
router.put('/:id', ctrl.update);

// Delete prescription
router.delete('/:id', ctrl.destroy);

module.exports = router;
