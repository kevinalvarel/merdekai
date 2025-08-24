const express = require("express");
const cors = require("cors");
const { openais } = require("./openai"); //
const { describeImage } = require("./describeImage.js");
const { generateImage } = require("./generateimage.js");
const app = express();
const { db } = require("./db/drizzle.js");
const { user, chat } = require("./db/schema");

app.use(cors());
app.use(express.json());

app.post("/imagegen", async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message);
    const reply = await generateImage(message);
    console.log(reply);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message);
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

app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await db.select().from(chat);
    res.json(allUsers);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/add/chat", async (req, res) => {
  try {
    const { id, name, email, image } = req.body;

    const newUser = await db
      .insert(user)
      .values({
        id,
        name,
        email,
        image,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    res.json(newUser);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("🚀 Server running at http://localhost:3001");
});
