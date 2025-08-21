const express = require("express");
const cors = require("cors");
const { openais } = require("./openai"); //
const { describeImage } = require("./describeImage.js");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await openais(message);
    console.log(reply);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});
app.post("/image", async (req, res) => {
  try {
    const { message, messagetxt } = req.body;
    const reply = await describeImage(message, messagetxt);
    res.json({ reply });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ reply: "⚠️ Gagal memproses gambar." });
  }
});

app.listen(3001, () => {
  console.log("🚀 Server running at http://localhost:3001");
});
