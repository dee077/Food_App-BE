const express = require('express');
const { uploadImage, handleUpload, deleteImage, clearImages} = require('../controllers/image');

const router = express.Router();

router.post('/upload', uploadImage, handleUpload);

router.delete('/delete/:filename', deleteImage);

router.delete('/clear', clearImages);

module.exports = router;