import { describeImage } from "@/utils/describeImage";

export async function POST(req) {
  try {
    const { message, messagetxt } = await req.json();
    const reply = await describeImage(message, messagetxt);

    return Response.json({ reply });
  } catch (err) {
    console.error("Error:", err);
    return Response.json(
      { reply: "⚠️ Gagal memproses gambar." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ message: "Image API ready ✅" });
}
