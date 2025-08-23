// generateimage.js
require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;

async function generateImage(text) {
  try {
    const response = await fetch("https://api.lunos.tech/v1/image/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "X-App-ID": "my-image-generator-v1.0",
      },
      body: JSON.stringify({
        model: "openai/dall-e-3",
        prompt: text,
        n: 1,
        size: "1024x1024",
        quality: "hd",
        response_format: "url"
      }),
    });

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API error ${response.status}: ${errText}`);
    }

    if (!contentType.includes("application/json")) {
      const textBody = await response.text();
      throw new Error(`error :\n${textBody.slice(0, 300)}`);
    }

    const data = await response.json();
    console.log("Full API Response:", data);

    if (data?.data?.length > 0) {
      console.log("Generated Image URL:", data.data[0].url);
      return data.data[0].url
    } else {
      throw new Error("No image URL returned");
    }

  } catch (error) {
    console.error("Error generating image:", error.message);
  }
}

module.exports = {generateImage}
