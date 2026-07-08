const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { PDFDocument } = require('pdf-lib');
const { deleteFile } = require('../utils/cleaner');

const outputsDir = path.join(__dirname, '../outputs');

// POST /api/merge/pdf
async function mergePdfs(req, res) {
  if (!req.files || req.files.length < 2) {
    return res.status(400).json({ error: 'Please upload at least 2 PDF files to merge.' });
  }

  // Support ordered merging via body.order (comma-separated original indices)
  let order = null;
  if (req.body && req.body.order) {
    try {
      order = JSON.parse(req.body.order);
    } catch (e) {
      order = null;
    }
  }

  const files = order
    ? order.map(i => req.files[parseInt(i)]).filter(Boolean)
    : req.files;

  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const bytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(bytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(p => mergedPdf.addPage(p));
    }

    const outputName = `merged_${uuidv4()}.pdf`;
    const outputPath = path.join(outputsDir, outputName);
    const pdfBytes = await mergedPdf.save();
    fs.writeFileSync(outputPath, pdfBytes);

    const downloadUrl = `/outputs/${outputName}`;
    res.json({ outputName, downloadUrl, pageCount: mergedPdf.getPageCount(), status: 'success' });
  } catch (err) {
    console.error('[mergePdfs error]', err);
    res.status(500).json({ error: err.message });
  } finally {
    req.files.forEach(f => deleteFile(f.path));
  }
}

// POST /api/merge/word
async function mergeWords(req, res) {
  if (!req.files || req.files.length < 2) {
    return res.status(400).json({ error: 'Please upload at least 2 Word documents to merge.' });
  }

  let order = null;
  if (req.body && req.body.order) {
    try { order = JSON.parse(req.body.order); } catch (e) { order = null; }
  }

  const files = order
    ? order.map(i => req.files[parseInt(i)]).filter(Boolean)
    : req.files;

  try {
    // Read all files as buffers
    const buffers = files.map(f => fs.readFileSync(f.path));

    // Use docx-merger to stitch documents
    const DocxMerger = require('@valentiniljaz/docx-merger');
    const merger = new DocxMerger({}, buffers);

    const outputName = `merged_${uuidv4()}.docx`;
    const outputPath = path.join(outputsDir, outputName);

    await new Promise((resolve, reject) => {
      merger.save('nodebuffer', (data) => {
        try {
          fs.writeFileSync(outputPath, data);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });

    const downloadUrl = `/outputs/${outputName}`;
    res.json({ outputName, downloadUrl, status: 'success' });
  } catch (err) {
    console.error('[mergeWords error]', err);
    res.status(500).json({ error: err.message });
  } finally {
    req.files.forEach(f => deleteFile(f.path));
  }
}

module.exports = { mergePdfs, mergeWords };
