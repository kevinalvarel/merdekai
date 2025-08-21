const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.lunos.tech/v1",
});

async function describeImage(image, text) {
  if (!image) throw new Error("❌ No image provided");
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are an Indonesian assistant. Describe the image in detail.",
      },
      {
        role: "user",
        content: [
          { type: "text", text: text },
          {
            type: "image_url",
            image_url: {
              url: image,
            },
          },
        ],
      },
    ],
  });

  return completion.choices[0]?.message?.content ?? "";
}

module.exports = { describeImage };
