export async function POST(req: Request) {
  const { message, model } = await req.json();
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: model || "qwen3:1.7b",
      prompt: message,
      stream: false,
    }),
  });
  const data = await response.json();
  return Response.json({ reply: data.response });
}
