require("dotenv").config();
const OpenAI = require("openai");
const fs = require("fs");
const path = require('path');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function transcribeAudio(filePath) {
    try {
        const absolutePath = path.resolve(filePath); 

        const audioFile = fs.createReadStream(absolutePath);
        const response = await openai.audio.transcriptions.create({
            model: "whisper-1",
            file: audioFile,
            language: "pt"
        });
        return response.text; 
    } catch (error) {
        console.error("Erro na transcrição:", error);
        throw error;
    }
}

module.exports = { transcribeAudio };
