const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issuesController');

router.get('/', issueController.getAllIssues);
router.post('/',issueController.createIssue);
router.delete('/:id', issueController.deleteIssue);
module.exports = router;