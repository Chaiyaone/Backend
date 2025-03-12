const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", authController.ShowLogin)
router.post("/login", authController.login);

module.exports = router