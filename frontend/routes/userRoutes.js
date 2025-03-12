const express = require("express")

const router = express.Router();
const userContorller = require("../controllers/userController")

router.get("/", userContorller.getUserList);
router.get("/delete/:id", userContorller.deleteUser);
router.get("/edit/:id", userContorller.showEditUserForm)
router.get("/add",userContorller.showAddUserForm)
router.post("/edit/:id", userContorller.editUser)
router.post("/add", userContorller.addUser)

module.exports = router;