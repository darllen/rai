const openai = require('./openai');
const PDFDocument = require('pdfkit');
const fs = require('fs');

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
    const compilado = `${indexText}\n${introductionText}\n${glossaryText}\n${systemEvolutionText}\n${techniqueUsedText}\n${functionalRequirementsText}\n${nonFunctionalRequirementsText}\n`;
    return await createPdf(compilado, "./src/assets/output.pdf");
  } catch (error) {
    console.error('Erro ao manipular o texto, verifique as etapas de manipulação', error);
  }
}

async function createPdf(compilado, outputPath) {
  const doc = new PDFDocument();

  try{
    doc.pipe(fs.createWriteStream(outputPath));
    doc.fontSize(12).text(compilado);
    doc.end();
    console.log('PDF criado com sucesso!');
  } catch (error) {
    console.error('Erro:', error);
  }

}
