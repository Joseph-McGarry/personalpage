// getRecipeFromOpenAI.tsx
// Calls our own /api/recipe route; the OpenAI key stays on the server.

export const FALLBACK_RECIPE = 'No soup for you. Come back, one week.';

export const getRecipeFromOpenAI = async (soup: string): Promise<string> => {
  try {
    const response = await fetch('/api/recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ soup }),
    });

    if (!response.ok) {
      throw new Error(`Recipe request failed with status ${response.status}`);
    }

    const { recipe } = await response.json();
    return typeof recipe === 'string' ? recipe : FALLBACK_RECIPE;
  } catch (error) {
    console.error('Error generating recipe from OpenAI:', error);
    return FALLBACK_RECIPE;
  }
};
