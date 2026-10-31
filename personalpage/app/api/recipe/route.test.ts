// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { POST } from './route';

const request = (body: unknown) =>
  new Request('http://localhost/api/recipe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

const openAiReply = (content: unknown, status = 200) =>
  new Response(JSON.stringify({ choices: [{ message: { content } }] }), { status });

describe('POST /api/recipe', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv('OPENAI_API_KEY', 'sk-test-key');
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    fetchMock.mockReset();
  });

  it('returns the recipe from OpenAI', async () => {
    fetchMock.mockResolvedValue(openAiReply('1. Boil water.'));

    const res = await POST(request({ soup: "Kramer's Hearty soup" }));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ recipe: '1. Boil water.' });
  });

  it('sends the key server-side and includes the soup in the prompt', async () => {
    fetchMock.mockResolvedValue(openAiReply('ok'));

    await POST(request({ soup: 'Newman soup' }));

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.openai.com/v1/chat/completions');
    expect(init.headers.Authorization).toBe('Bearer sk-test-key');
    expect(JSON.parse(init.body).messages[1].content).toContain('Newman soup');
  });

  it('returns 503 without calling OpenAI when no key is configured', async () => {
    vi.stubEnv('OPENAI_API_KEY', '');

    const res = await POST(request({ soup: 'soup' }));

    expect(res.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ['a missing soup', {}],
    ['a non-string soup', { soup: 42 }],
    ['a blank soup', { soup: '   ' }],
    ['an oversized soup', { soup: 'x'.repeat(1001) }],
  ])('rejects %s with 400', async (_label, body) => {
    const res = await POST(request(body));

    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects malformed JSON with 400', async () => {
    const res = await POST(request('{not json'));

    expect(res.status).toBe(400);
  });

  it('returns 502 and hides upstream details when OpenAI fails', async () => {
    fetchMock.mockResolvedValue(new Response('quota exceeded', { status: 429 }));

    const res = await POST(request({ soup: 'soup' }));

    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: 'Recipe generation failed.' });
  });

  it('returns 502 when OpenAI returns an unexpected shape', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ choices: [] })));

    const res = await POST(request({ soup: 'soup' }));

    expect(res.status).toBe(502);
  });
});
