const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function describeImage(image, text) {
  if (!image) throw new Error("❌ No image provided");
  console.log(image)
  const response = await openai.responses.create({
  model: "gpt-5-nano",
  input: [
    {
      role: "system",
      content: [
        {
          type: "input_text",
          text: "Kamu adalah asisten AI yang membantu menjawab pertanyaan pengguna dalam Bahasa Indonesia dengan gaya sopan, ringkas, dan mudah dipahami."
        }
      ]
    },
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: text || "Gambar apa ini?"
        },
        {
          type: "input_image",
          image_url: image
        }
      ]
    }
  ]
});


  return response.output_text ?? "Tidak ada Respon";
}

module.exports = { describeImage };
