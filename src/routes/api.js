const express = require("express");
const multer = require("multer");
const path = require("path");
const { transcribeAudio } = require("../services/transcribe-service");
const { extractRequirements } = require("../services/requirements-service");
const { generateHtml, convertHtmlToPdf } = require("../services/document-service");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/"); 
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname); 
        if (extname !== '.mp3') {
            return cb(new Error('Formato de arquivo inválido. Apenas MP3 é permitido.'));
        }
        cb(null, Date.now() + extname); 
    }
});

const upload = multer({ storage: storage });

router.post("/transcribe", upload.single("audio"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
    }
    if (req.file.mimetype !== 'audio/mpeg') {
        return res.status(400).json({ error: 'Formato de arquivo inválido. Apenas MP3 é permitido.' });
    }

    try {
        const transcribedText = await transcribeAudio(req.file.path);
        const requirements = await extractRequirements(transcribedText);
        const htmlPath = await generateHtml(requirements);
        const pdfPath = await convertHtmlToPdf(htmlPath, "public/requisitos.pdf");

        res.json({ success: true, pdfPath });
    } catch (error) {
        res.status(500).json({ error: "Erro ao processar áudio." });
    }
});

module.exports = router;
