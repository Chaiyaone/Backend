const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

router.get('/eq', equipmentController.getEquipment)
router.get('/', equipmentController.getAllEquipment);
router.get('/:id', equipmentController.getEquipmentById);
router.post('/', equipmentController.createEquipment);
router.delete('/:id',equipmentController.deleteEquipment)
router.put('/:id', equipmentController.updateEquipment)

module.exports = router;