const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { docxToPdf } = require('../utils/docxToPdf');
const { pdfToDocx } = require('../utils/pdfToDocx');
const { deleteFile } = require('../utils/cleaner');

const outputsDir = path.join(__dirname, '../outputs');

// In-memory history store
const history = [];

function addHistory(entry) {
  history.unshift({ ...entry, id: uuidv4(), timestamp: new Date().toISOString() });
  if (history.length > 50) history.pop();
}

// POST /api/convert/word-to-pdf
async function wordToPdf(req, res) {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded.' });
  }

  const results = [];

  for (const file of req.files) {
    const inputPath = file.path;
    const outputName = `${path.parse(file.originalname).name}.pdf`;
    const outputPath = path.join(outputsDir, `${uuidv4()}.pdf`);

    try {
      await docxToPdf(inputPath, outputPath);
      const downloadUrl = `/outputs/${path.basename(outputPath)}`;
      results.push({
        originalName: file.originalname,
        outputName,
        downloadUrl,
        size: require('fs').statSync(outputPath).size,
        status: 'success'
      });
      addHistory({
        type: 'Word to PDF',
        originalName: file.originalname,
        outputName,
        downloadUrl,
        status: 'success'
      });
    } catch (err) {
      console.error('[wordToPdf error]', err);
      results.push({
        originalName: file.originalname,
        status: 'error',
        error: err.message
      });
      addHistory({ type: 'Word to PDF', originalName: file.originalname, status: 'error', error: err.message });
    } finally {
      deleteFile(inputPath);
    }
  }

  res.json({ results });
}

// POST /api/convert/pdf-to-word
async function pdfToWord(req, res) {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded.' });
  }

  const results = [];

  for (const file of req.files) {
    const inputPath = file.path;
    const outputName = `${path.parse(file.originalname).name}.docx`;
    const outputPath = path.join(outputsDir, `${uuidv4()}.docx`);

    try {
      await pdfToDocx(inputPath, outputPath);
      const downloadUrl = `/outputs/${path.basename(outputPath)}`;
      results.push({
        originalName: file.originalname,
        outputName,
        downloadUrl,
        size: require('fs').statSync(outputPath).size,
        status: 'success'
      });
      addHistory({
        type: 'PDF to Word',
        originalName: file.originalname,
        outputName,
        downloadUrl,
        status: 'success'
      });
    } catch (err) {
      console.error('[pdfToWord error]', err);
      results.push({ originalName: file.originalname, status: 'error', error: err.message });
      addHistory({ type: 'PDF to Word', originalName: file.originalname, status: 'error', error: err.message });
    } finally {
      deleteFile(inputPath);
    }
  }

  res.json({ results });
}

// GET /api/history
function getHistory(req, res) {
  res.json({ history });
}

module.exports = { wordToPdf, pdfToWord, getHistory };
