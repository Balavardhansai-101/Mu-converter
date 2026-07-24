const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const routes = require('./routes');
const { startCleanupScheduler } = require('./utils/cleaner');

const app = express();
const PORT = Number(process.env.PORT) || 5001;

// Ensure upload/output directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const outputsDir = path.join(__dirname, 'outputs');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(outputsDir)) fs.mkdirSync(outputsDir, { recursive: true });

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ extended: true, limit: '150mb' }));

// Serve output files statically for download
app.use('/outputs', express.static(outputsDir));

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Start cleanup scheduler (every 5 minutes, remove files older than 10 mins)
startCleanupScheduler();

app.listen(PORT, () => {
  console.log(`✅ Document Converter Pro backend running on http://localhost:${PORT}`);
});

module.exports = app;
