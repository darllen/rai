const stages = require('./stages');
const dotenv = require('dotenv');
const OpenAI = require('openai');
const fs = require('fs');

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = {

  async transcribe(req, res) {
    try {
      const fileData = req.file.buffer; 
      const filePath = `${process.env.PATH_TO_PROJECT}/rai/src/assets/audio/${req.file.originalname}`;
  
      await stages.saveFileFromRequest(fileData, filePath);
  
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(`./src/assets/audio/${req.file.originalname}`),
        model: 'whisper-1',
      });
  
      await stages.deleteFile(filePath);
  
      return transcription.text;
    } catch (error) {
      console.error('Erro ao transcrever áudio:', error);
      throw error;
    }
  },
  
  async index(transcription) {
    const question = await stages.indexQuestion(transcription);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });
    const result = response.choices[0].message.content;
    return result;
  },

  async introduction(transcription) {
    const question = await stages.introductionQuestion(transcription);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });
    return response.choices[0].message.content;
  },

  async glossary(transcription) {
    const question = await stages.glossaryQuestion(transcription);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });
    return response.choices[0].message.content;
  },

  async functionalRequirements(transcription) {
    const question = await stages.functionalRequirementsQuestion(transcription);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });
    return response.choices[0].message.content;
  },

  async nonFunctionalRequirements(transcription) {
    const question = await stages.nonFunctionalRequirementsQuestion(transcription);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });
    return response.choices[0].message.content;
  },

  async systemEvolution(transcription) {
    const question = await stages.systemEvolutionQuestion(transcription);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });
    return response.choices[0].message.content;
  },

  async techniqueUsed(transcription) {
    const question = await stages.techniqueUsedQuestion(transcription);
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });
    return response.choices[0].message.content;
  },

}


