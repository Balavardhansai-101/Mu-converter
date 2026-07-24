const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } = require('docx');

/**
 * Convert a PDF to .docx using pdf-parse (text extraction) + docx (document builder)
 * @param {string} inputPath - absolute path to .pdf
 * @param {string} outputPath - absolute path for output .docx
 */
async function pdfToDocx(inputPath, outputPath) {
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const dataBuffer = fs.readFileSync(inputPath);
  const loadingTask = getDocument({ data: new Uint8Array(dataBuffer) });
  const pdf = await loadingTask.promise;

  const textItems = [];
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const strings = content.items.map((item) => item.str).filter(Boolean);
    if (strings.length > 0) {
      textItems.push(strings.join(' '));
    }
  }

  const rawText = textItems.join('\n\n').trim();
  const lines = rawText.split(/\r?\n/).filter((line) => line.length > 0);

  const paragraphs = lines.map((line) => new Paragraph({
    children: [new TextRun({ text: line.trim(), size: 22 })],
  }));

  const doc = new Document({
    sections: [{ properties: {}, children: paragraphs }],
    creator: 'Document Converter Pro',
    title: 'Converted Document',
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
}

module.exports = { pdfToDocx };
