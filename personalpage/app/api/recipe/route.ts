// Server-side proxy for OpenAI so the API key never reaches the browser.
import { NextResponse } from 'next/server';

const MAX_SOUP_LENGTH = 1000;
const MODEL = 'gpt-3.5-turbo';

const SYSTEM_PROMPT =
  'You are a 3-star Michelin chef specializing in soup recipes. Follow the specified recipe format strictly, using only relevant culinary language and adapting ingredients based on descriptive words in the soup name.';

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Recipe generation is not configured.' }, { status: 503 });
  }

  let soup: unknown;
  try {
    ({ soup } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (typeof soup !== 'string' || !soup.trim() || soup.length > MAX_SOUP_LENGTH) {
    return NextResponse.json({ error: 'Invalid soup.' }, { status: 400 });
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Write a detailed soup recipe for "${soup}"...` },
      ],
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    }),
  });

  if (!response.ok) {
    console.error('OpenAI request failed:', response.status, await response.text());
    return NextResponse.json({ error: 'Recipe generation failed.' }, { status: 502 });
  }

  const data = await response.json();
  const recipe = data?.choices?.[0]?.message?.content;
  if (typeof recipe !== 'string') {
    return NextResponse.json({ error: 'Recipe generation failed.' }, { status: 502 });
  }

  return NextResponse.json({ recipe });
}
