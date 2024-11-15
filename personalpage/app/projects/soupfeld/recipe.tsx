// RecipeComponent.tsx

import React, { useState } from 'react';
import { getRecipeFromOpenAI } from './openAi';

const RecipeComponent: React.FC = () => {
  const [soupName, setSoupName] = useState<string>('');
  const [recipe, setRecipe] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateRecipe = async () => {
    setLoading(true);
    try {
      const generatedRecipe = await getRecipeFromOpenAI(soupName);
      setRecipe(generatedRecipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setRecipe('An error occurred while generating the recipe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Generate a Soup Recipe</h1>
      <input
        type="text"
        value={soupName}
        onChange={(e) => setSoupName(e.target.value)}
        placeholder="Enter soup name"
      />
      <button onClick={handleGenerateRecipe} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Recipe'}
      </button>
      {recipe && (
        <div>
          <h2>Recipe:</h2>
          <pre>{recipe}</pre>
        </div>
      )}
    </div>
  );
};

export default RecipeComponent;
