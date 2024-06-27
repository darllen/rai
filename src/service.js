const controller = require('./controller');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/rai/transcribe', upload.single('audio'), controller.transcribe);

module.exports = router;
