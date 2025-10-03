const router = require('express').Router();
const ctrl = require('../controllers/appointments');

router.get('/', ctrl.index);
router.post('/', ctrl.create);
router.get('/:id/edit', ctrl.editForm);
router.post('/:id/edit', ctrl.update);
router.post('/:id/delete', ctrl.remove);

module.exports = router;