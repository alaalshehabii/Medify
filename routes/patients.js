const router = require('express').Router();
const ctrl = require('../controllers/patients');

router.get('/', ctrl.index);
router.get('/new', ctrl.new);
router.post('/', ctrl.create);
router.get('/:id', ctrl.show);
router.get('/:id/edit', ctrl.edit);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.destroy);

module.exports = router;