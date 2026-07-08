const mammoth = require('mammoth');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Convert a .docx file to PDF using mammoth (HTML extraction) + PDFKit (rendering)
 * @param {string} inputPath - absolute path to the .docx file
 * @param {string} outputPath - absolute path for the output .pdf
 */
async function docxToPdf(inputPath, outputPath) {
  // Step 1: Extract structured content from docx via mammoth
  const result = await mammoth.extractRawText({ path: inputPath });
  const rawText = result.value;

  // Also get messages/warnings
  if (result.messages && result.messages.length > 0) {
    result.messages.forEach(m => console.log(`[mammoth] ${m.type}: ${m.message}`));
  }

  // Step 2: Parse lines from raw text
  const lines = rawText.split('\n');

  // Step 3: Create PDF with PDFKit
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 72,
      size: 'A4',
      info: {
        Title: path.basename(inputPath, '.docx'),
        Author: 'Document Converter Pro',
        Creator: 'Document Converter Pro'
      }
    });

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    // Register fonts (built-in)
    doc.font('Helvetica');

    let isFirst = true;
    lines.forEach((line) => {
      const trimmed = line.trim();

      if (!isFirst && trimmed === '') {
        // Empty line = paragraph spacing
        doc.moveDown(0.5);
        return;
      }

      if (trimmed === '') return;

      isFirst = false;

      // Detect headings: ALL CAPS or very short lines at start
      const isHeading = trimmed.length < 100 && (
        trimmed === trimmed.toUpperCase() && trimmed.length > 2 ||
        /^#{1,6}\s/.test(trimmed)
      );

      // Bullet detection
      const isBullet = /^[\-\*\•]\s+/.test(trimmed);

      if (isHeading) {
        doc.moveDown(0.5)
          .font('Helvetica-Bold')
          .fontSize(14)
          .text(trimmed, { align: 'left' })
          .font('Helvetica')
          .fontSize(11);
      } else if (isBullet) {
        const content = trimmed.replace(/^[\-\*\•]\s+/, '');
        doc.fontSize(11)
          .text(`• ${content}`, { indent: 20, lineGap: 2 });
      } else {
        doc.fontSize(11)
          .text(trimmed, { align: 'justify', lineGap: 2 });
      }
    });

    doc.end();

    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
}

module.exports = { docxToPdf };
