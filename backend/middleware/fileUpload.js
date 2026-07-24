const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const unique = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  }
});

const allowedTypes = {
  'application/pdf': true,
  'application/msword': true,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true,
};

const fileFilter = (req, file, cb) => {
  if (allowedTypes[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 150 * 1024 * 1024 } // 150 MB
});

module.exports = upload;
