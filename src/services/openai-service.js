require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function callChatGPT(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: "Você é um analista de requisitos." }, { role: "user", content: prompt }],
            max_tokens: 1000,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Erro ao chamar o ChatGPT:", error);
        throw error;
    }
}

module.exports = { callChatGPT };
