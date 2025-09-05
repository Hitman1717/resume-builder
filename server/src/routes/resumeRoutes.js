const express = require('express');
const resumeController = require('../controllers/resumeController');

const router = express.Router();

// Resume generation routes
router.post('/generate', resumeController.generateResume);
router.post('/preview', resumeController.previewResume);

module.exports = router;
