const OpenAI = require("openai");

require("dotenv").config();

const openai = new OpenAI({
  apiKey: "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",
});

async function openais(message) {
  console.log("API KEY starts with:", process.env.OPENAI_API_KEY);

const response = await openai.responses.create({
  model: "gpt-5-nano",
  input: message,
  store: true,
});

  return response.output_text ?? "";
}

module.exports = { openais };
