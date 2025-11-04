const OpenAI = require("openai");

require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function openais(message) {


const response = await openai.responses.create({
  model: "gpt-5-nano",
  input: message,
  store: true,
});

  return response.output_text ?? "";
}

module.exports = { openais };
