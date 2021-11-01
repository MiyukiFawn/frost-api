import express from 'express';
import controller from '../controllers/weapons';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getOnly);
router.post('/', controller.createWeapon);
router.delete('/:id', controller.deleteWeapon);
router.put('/:id', controller.updateWeapon);

export = router;
