const openai = require('./openai');

module.exports = {
  async transcribe(req, res) {
    try {
      const transcription = await openai.transcribe(req);
      const result = await manipulate(transcription);
      res.status(200).json({ message: result });
    } catch (error) {
      console.error('Erro ao transcrever áudio:', error);
      res.status(500).json({ error: 'Erro ao processar a transcrição de áudio' });
    }
  },
};

async function manipulate(transcription){
  try {
    const indexText = await openai.index(transcription);
    const introductionText = await openai.introduction(transcription);
    const glossaryText = await openai.glossary(transcription);
    const systemEvolutionText = await openai.systemEvolution(transcription);
    const techniqueUsedText = await openai.techniqueUsed(transcription);
    const functionalRequirementsText = await openai.functionalRequirements(transcription);
    const nonFunctionalRequirementsText = await openai.nonFunctionalRequirements(transcription);
    return `${indexText}\n${introductionText}\n${glossaryText}\n${systemEvolutionText}\n${techniqueUsedText}\n${functionalRequirementsText}\n${nonFunctionalRequirementsText}\n`;
  } catch (error) {
    console.error('Erro ao manipular o texto, verifique as etapas de manipulação', error);
  }
}
