const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./src/middleware/cors');
const errorHandler = require('./src/middleware/errorHandler');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(corsMiddleware);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/', routes);

// Error handling middleware (should be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Resume Builder API server running on http://localhost:${PORT}`);
  console.log(`📚 Health check available at http://localhost:${PORT}/health`);
  console.log(`📄 Resume API available at http://localhost:${PORT}/api/resume`);
});

module.exports = app;
