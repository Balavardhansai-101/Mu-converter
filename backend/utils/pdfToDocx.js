const pdfParse = require('pdf-parse');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const fs = require('fs');

/**
 * Convert a PDF to .docx using pdf-parse (text extraction) + docx (document builder)
 * @param {string} inputPath - absolute path to .pdf
 * @param {string} outputPath - absolute path for output .docx
 */
async function pdfToDocx(inputPath, outputPath) {
  const dataBuffer = fs.readFileSync(inputPath);
  const data = await pdfParse(dataBuffer);

  const rawText = data.text;
  const lines = rawText.split('\n');

  const docChildren = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      // Empty line = spacer paragraph
      docChildren.push(new Paragraph({ text: '' }));
      return;
    }

    // Heuristic: short ALL CAPS line = heading
    const isHeading =
      trimmed.length < 80 &&
      trimmed === trimmed.toUpperCase() &&
      trimmed.length > 2;

    const isBullet = /^[\-\*\•]\s+/.test(trimmed);

    if (isHeading) {
      docChildren.push(
        new Paragraph({
          text: trimmed,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        })
      );
    } else if (isBullet) {
      const content = trimmed.replace(/^[\-\*\•]\s+/, '');
      docChildren.push(
        new Paragraph({
          bullet: { level: 0 },
          children: [new TextRun({ text: content, size: 22 })]
        })
      );
    } else {
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          children: [new TextRun({ text: trimmed, size: 22 })],
          spacing: { line: 276 }
        })
      );
    }
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: docChildren
      }
    ],
    creator: 'Document Converter Pro',
    title: 'Converted Document'
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
}

module.exports = { pdfToDocx };
