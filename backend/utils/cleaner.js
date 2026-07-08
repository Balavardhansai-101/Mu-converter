const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '../uploads');
const outputsDir = path.join(__dirname, '../outputs');
const MAX_AGE_MS = 10 * 60 * 1000; // 10 minutes

function cleanDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const now = Date.now();
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    try {
      const stat = fs.statSync(filePath);
      if (now - stat.mtimeMs > MAX_AGE_MS) {
        fs.unlinkSync(filePath);
        console.log(`🧹 Cleaned: ${filePath}`);
      }
    } catch (e) {
      // ignore
    }
  });
}

function cleanAll() {
  cleanDirectory(uploadsDir);
  cleanDirectory(outputsDir);
}

function deleteFile(filePath) {
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (e) {
    // ignore
  }
}

function startCleanupScheduler() {
  setInterval(cleanAll, 5 * 60 * 1000); // every 5 minutes
  console.log('🕐 Cleanup scheduler started (every 5 minutes)');
}

module.exports = { cleanAll, deleteFile, startCleanupScheduler };
