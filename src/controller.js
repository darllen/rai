const openai = require('./openai');

module.exports = {
  async transcribe(req, res) {
    try {
      const transcription = await openai.transcribe(req);
      res.json({ transcription });
    } catch (error) {
      console.error('Erro ao transcrever áudio:', error);
      res.status(500).json({ error: 'Erro ao processar a transcrição de áudio' });
    }
  }
};
