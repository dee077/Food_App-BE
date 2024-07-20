// controllers/imageController.js
const fs = require('fs-extra');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    fs.ensureDirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

const uploadImage = upload.single('file');

const handleUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({ 
    filePath: `/api/uploads/${req.file.filename}`,
    imageId: req.file.filename
  });
};

const deleteImage = async (req, res) => {
  const { filename } = req.params;
  try {
    await fs.remove(path.join(__dirname, '../uploads', filename));
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send('Error deleting file.');
  }
};

const clearImages = async (req, res) => {
  try {
    await fs.emptyDir(path.join(__dirname, '../uploads'));
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send('Error clearing images.');
  }
};

module.exports = { uploadImage, handleUpload, deleteImage, clearImages };
