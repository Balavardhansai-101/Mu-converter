const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');
const { v4: uuidv4 } = require('uuid');
const { deleteFile } = require('../utils/cleaner');

const outputsDir = path.join(__dirname, '../outputs');

// POST /api/extra/zip  -- body: { files: ['uuid1.pdf', 'uuid2.docx'] }
function createZip(req, res) {
  const { files } = req.body;
  if (!files || !Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ error: 'No files specified for zipping.' });
  }

  try {
    const zip = new AdmZip();
    const validFiles = [];

    files.forEach(filename => {
      const safeName = path.basename(filename); // prevent path traversal
      const filePath = path.join(outputsDir, safeName);
      if (fs.existsSync(filePath)) {
        zip.addLocalFile(filePath);
        validFiles.push(safeName);
      }
    });

    if (validFiles.length === 0) {
      return res.status(404).json({ error: 'None of the specified files exist.' });
    }

    const zipName = `batch_${uuidv4()}.zip`;
    const zipPath = path.join(outputsDir, zipName);
    zip.writeZip(zipPath);

    res.json({ zipName, downloadUrl: `/outputs/${zipName}`, fileCount: validFiles.length, status: 'success' });
  } catch (err) {
    console.error('[createZip error]', err);
    res.status(500).json({ error: err.message });
  }
}

// POST /api/extra/contact
function contactForm(req, res) {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  // In a production app, send via nodemailer / SMTP. For now, log and respond.
  console.log(`📧 Contact Form Submission:
  Name: ${name}
  Email: ${email}
  Subject: ${subject || 'N/A'}
  Message: ${message}
  `);
  res.json({ success: true, message: 'Your message has been received. We will get back to you shortly!' });
}

module.exports = { createZip, contactForm };
