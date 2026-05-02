'use strict';
const multer = require('multer');

// Store in memory so we can stream directly to R2
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'model/gltf-binary', 'application/octet-stream'];
  if (allowed.includes(file.mimetype) || file.originalname.endsWith('.glb')) {
    cb(null, true);
  } else {
    cb(new Error(`File type not allowed: ${file.mimetype}`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB max
});

module.exports = { upload };
