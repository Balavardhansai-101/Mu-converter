const express = require('express');
const router = express.Router();
const upload = require('./middleware/fileUpload');
const { wordToPdf, pdfToWord, getHistory } = require('./controllers/convertController');
const { mergePdfs, mergeWords } = require('./controllers/mergeController');
const { createZip, contactForm } = require('./controllers/extraController');
const { signup, login } = require('./controllers/authController');

// Conversion routes
router.post('/convert/word-to-pdf', upload.array('files', 10), wordToPdf);
router.post('/convert/pdf-to-word', upload.array('files', 10), pdfToWord);

// Merge routes
router.post('/merge/pdf', upload.array('files', 20), mergePdfs);
router.post('/merge/word', upload.array('files', 20), mergeWords);

// History
router.get('/history', getHistory);

// Auth
router.post('/auth/signup', express.json(), signup);
router.post('/auth/login', express.json(), login);

// Extra
router.post('/extra/zip', express.json(), createZip);
router.post('/extra/contact', express.json(), contactForm);

module.exports = router;
