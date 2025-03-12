const express = require("express");
const router = express.Router();
const issuesController = require("../controllers/issueController");
const completedControllers = require('../controllers/completedControllers');

router.get("/", issuesController.getIssuesList);
router.get("/report", issuesController.ShowReport);
router.post("/report", issuesController.postIssues);
router.get("/confirm/:id", issuesController.deleteIssue);
router.get("/completed", completedControllers.getCompleted)
module.exports = router