const express = require('express');
const router = express.Router();
const controller = require('./controller');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/rai/transcribe', upload.single('audio'), controller.transcribe);

module.exports = router;
