const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "process.env.OPENAI_API_KEY",
  baseURL: "process.env.OPENAI_URL",
});

async function openais(message) {
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "Kamu adalah seorang asisten yang sangat membantu user/client dari Indonesia",
      },
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
