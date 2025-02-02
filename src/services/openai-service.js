require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function callChatGPT(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "system", content: "Você é um engenheiro de requisitos visionário e criativo de requisitos." }, { role: "user", content: prompt }],
            temperature: 1.1,
            top_p: 0.9
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Erro ao chamar o ChatGPT:", error);
        throw error;
    }
}

module.exports = { callChatGPT };
