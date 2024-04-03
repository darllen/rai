const fs = require('fs');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function transcribe(req) {
  try {
    
    const fileData = req.file.buffer; 
    const filePath = `${process.env.PATH_TO_PROJECT}/rai/src/assets/audio/${req.file.originalname}`;

    await saveFileFromRequest(fileData, filePath);

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream("./src/assets/audio/teste.mp3"),
      model: 'whisper-1',
    });

    await deleteFile(filePath);

    return transcription.text;

  } catch (error) {
    console.error('Erro ao transcrever áudio:', error);
    throw error;
  }
}

function saveFileFromRequest(fileData, filePath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, fileData, err => {
      if (err) {
        console.error('Erro ao salvar o arquivo:', err);
        reject(err);
      } else {
        console.log('Arquivo salvo com sucesso.');
        resolve();
      }
    });
  });
}

function deleteFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, err => {
      if (err) {
        console.error('Erro ao excluir o arquivo:', err);
        reject(err);
      } else {
        console.log('Arquivo excluído com sucesso.');
        resolve();
      }
    });
  });
}


module.exports = { transcribe };
