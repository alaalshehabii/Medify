const router = require('express').Router();
const ctrl = require('../controllers/medications');

// List all medications
router.get('/', ctrl.index);

// Show form for new medication
router.get('/new', ctrl.new);

// Create medication
router.post('/', ctrl.create);

// Show single medication
router.get('/:id', ctrl.show);

// Show edit form
router.get('/:id/edit', ctrl.edit);

// Update medication
router.put('/:id', ctrl.update);

// Delete medication
router.delete('/:id', ctrl.destroy);

module.exports = router;
