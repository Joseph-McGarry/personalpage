// getRecipeFromOpenAI.tsx

import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const getRecipeFromOpenAI = async (soup: string): Promise<string> => {
  const prompt = `You are a 3-star Michelin chef known for creating the world’s best soups. 
Write a detailed, step-by-step recipe for "${soup}" using the following main ingredients.

- Use numbered steps for instructions, without additional sub-points (like "a," "i").
- Organize the recipe as follows: Ingredients, Instructions, and Serving Suggestions.
- Each instruction step should be a complete sentence and avoid nested steps.
- Keep the tone formal and precise.

- Include cooking instructions, timings, and strict serving tips.
- Add ingredients or techniques based on descriptive words in the soup name. For example:
    - If the name includes "creamy," add ingredients to achieve a creamy texture.
    - If it says "spicy," add spices or peppers to increase heat.
    - If the name includes other descriptors, such as "herb-infused" or "smoky," adjust ingredients or techniques accordingly.`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a 3-star Michelin chef specializing in soup recipes. Follow the specified recipe format strictly, using only relevant culinary language and adapting ingredients based on descriptive words in the soup name."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,  // Lowered to reduce randomness
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,  // Bearer token for authentication
        },
      }
    );

    return response.data.choices[0].message.content as string;  // Returns the generated recipe content
  } catch (error) {
    console.error('Error generating recipe from OpenAI:', error);
    return 'No soup for you. Come back, one week.';
  }
};
