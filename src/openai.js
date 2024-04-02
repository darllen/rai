const fs = require('fs');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function transcribe(req) {
  try {
    const audioFile = req.file;
    if (!audioFile) {
      throw new Error('Arquivo de áudio não enviado');
    }
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile.buffer,
      model: 'whisper-1',
    });
    
    return transcription.text;
  } catch (error) {
    //ta entrando aqui
    console.error('Erro ao transcrever áudio:', error);
    throw error;
  }
}

module.exports = { transcribe };
