const OpenAI = require("openai");

require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function openais(message) {
const response = await openai.responses.create({
  model: "gpt-5-nano",
  input: [
    {
      role: "system",
      content: "You are an AI bot named LearningX. You only receive and respond to text messages — never images.",
    },
    {
      role: "user",
      content: message,
    },
  ],
  store: true,
});

  return response.output_text ?? "Tidak ada respon";
}

module.exports = { openais };
