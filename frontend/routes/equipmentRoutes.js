const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipmentController");

router.get("/", equipmentController.getEquipmentList);
router.get("/delete/:id", equipmentController.deleteEquipment);
router.get("/add", equipmentController.showAddEquipmentForm);
router.post("/add", equipmentController.addEquipment);
router.get("/edit/:id", equipmentController.showEditEquipmentForm);
router.post("/edit/:id", equipmentController.editEquipment);

module.exports = router;