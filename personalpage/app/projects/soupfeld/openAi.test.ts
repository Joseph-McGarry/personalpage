import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getRecipeFromOpenAI, FALLBACK_RECIPE } from './openAi';

describe('getRecipeFromOpenAI', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    fetchMock.mockReset();
  });

  it('posts the soup to our API route, never to OpenAI directly', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ recipe: 'Stir.' })));

    await getRecipeFromOpenAI('Jerry soup');

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/recipe');
    expect(JSON.parse(init.body)).toEqual({ soup: 'Jerry soup' });
    expect(init.headers).not.toHaveProperty('Authorization');
  });

  it('returns the recipe on success', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ recipe: 'Stir.' })));

    expect(await getRecipeFromOpenAI('soup')).toBe('Stir.');
  });

  it('falls back when the API responds with an error status', async () => {
    fetchMock.mockResolvedValue(new Response('{}', { status: 502 }));

    expect(await getRecipeFromOpenAI('soup')).toBe(FALLBACK_RECIPE);
  });

  it('falls back when the network request throws', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

    expect(await getRecipeFromOpenAI('soup')).toBe(FALLBACK_RECIPE);
  });
});
