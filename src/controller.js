const openai = require('./openai');
const stages = require('./stages');

module.exports = {
  async transcribe(req, res) {
    try {
      const transcription = await openai.transcribe(req);
      const manipulated = stages.manipulate(transcription);
      res.json({ manipulated });
    } catch (error) {
      console.error('Erro ao transcrever áudio:', error);
      res.status(500).json({ error: 'Erro ao processar a transcrição de áudio' });
    }
  }
};
