const { callChatGPT } = require("./openai-service");

async function extractRequirements(transcribedText) {
    const prompt = `Uma reunião de levantamento de requisitos foi realizada com o cliente, observe a transcrição:"\n\n${transcribedText}" Objetivo: Quero extrair o MÁXIMO POSSÍVEL de informações e requisitos a partir do texto acima, garantindo QUE NENHUM DETALHE IMPORTANTE SEJA PERDIDO. Não economize na listagem de requisitos por favor. Identifique requisitos funcionais, não funcionais e quaisquer outras informações relevantes. `;

    const response = await callChatGPT(prompt);
    return response;
}

module.exports = { extractRequirements };
