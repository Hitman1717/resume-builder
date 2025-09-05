const express = require('express');
const resumeRoutes = require('./resumeRoutes');

const router = express.Router();

// API Routes
router.use('/api/resume', resumeRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Resume Builder API'
  });
});

module.exports = router;
