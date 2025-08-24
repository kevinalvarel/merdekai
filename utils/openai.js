const OpenAI = require("openai");

require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.lunos.tech/v1",
});

async function openais(message) {
  console.log("API KEY starts with:", process.env.OPENAI_API_KEY);

  const completion = await openai.chat.completions.create({
    model: "openai/gpt-4o",
    messages: [
      { role: "system", content: "you are a indonesian assistant" },
      { role: "user", content: message },
    ],
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  return completion.choices[0]?.message?.content ?? "";
}

module.exports = { openais };
