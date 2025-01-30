const { callChatGPT } = require("./openai-service");

async function extractRequirements(transcribedText) {
    const prompt = `A partir do seguinte texto de uma reunião de levantamento de requisitos, extraia requisitos funcionais e não funcionais:\n\n${transcribedText}`;

    const response = await callChatGPT(prompt);
    return response;
}

module.exports = { extractRequirements };
