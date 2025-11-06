import { openais } from "@/utils/openai";

export async function POST(req) {
  try {
    const { message } = await req.json();
    const reply = await openais(message);
    return Response.json({ reply });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ message: "Chat API ready ✅" });
}
