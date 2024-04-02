import OpenAI from "openai";
import dotenv from 'dotenv';
const fs = require('fs');

dotenv.config()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("./src/assets/audio/teste.mp3"),
    model: "whisper-1",
  });

  console.log(transcription.text);
}

main();