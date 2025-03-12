const express = require("express");
const router = express.Router();
const generalControllers = require("../controllers/generalControllers");

router.get("/user", generalControllers.getUser);
router.get("/equipments", generalControllers.getEquipment);
router.get("/reportlist", generalControllers.getIssuesList);
router.get("/completed", generalControllers.getCompleted);
module.exports = router