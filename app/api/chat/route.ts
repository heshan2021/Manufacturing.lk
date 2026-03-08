import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request): Promise<Response> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'GEMINI_API_KEY is not set on the server.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const google = createGoogleGenerativeAI({
    apiKey,
  });

  let prompt: unknown;

  try {
    const body = await req.json();
    prompt = (body as { prompt?: unknown })?.prompt;
  } catch {
    // ignore JSON parse errors and handle below
  }

  if (typeof prompt !== 'string' || !prompt.trim()) {
    return new Response(JSON.stringify({ error: 'Missing or invalid `prompt`.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt,
    });

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Gemini request failed:', error);

    return new Response(JSON.stringify({ error: 'Failed to generate text.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

