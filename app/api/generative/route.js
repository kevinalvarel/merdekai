import { generateImage } from "@/utils/generateimage";

export async function POST(req) {
  try {
    const { message } = await req.json();
    const reply = await generateImage(message);
    return Response.json({ reply });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ message: "Chat API ready ✅" });
}
