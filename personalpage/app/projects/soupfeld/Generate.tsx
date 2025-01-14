// export default Generate;
import React, { useState, useEffect, useRef } from 'react';
import { createSoup } from './soupGen';
import Soup from './Soup';
import { getRecipeFromOpenAI } from './openAi'; 

interface Modes {
  seafoodMode: boolean;
  veggieMode: boolean;
  bizarroMode: boolean;
}

interface GenerateProps {
  modes: Modes;
  onSoupGenerated: (generatedSoup: string) => void;
}

const Generate: React.FC<GenerateProps> = ({ modes, onSoupGenerated }) => {
  const [generatedSoup, setGeneratedSoup] = useState<string>(''); // State to store the generated soup
  const [recipe, setRecipe] = useState<string>(''); // State to store the generated recipe
  const [isLoading, setIsLoading] = useState<boolean>(false);  // To show a loader when generating the recipe
  const loadingAudio = useRef<HTMLAudioElement | null>(null); // Use ref for the audio element

  // Initialize the audio only on the client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadingAudio.current = new Audio('/intro-1.mp3'); // Use the correct path
    }
  }, []);

  // Play the audio when `isLoading` becomes true
  useEffect(() => {
    if (isLoading && loadingAudio.current) {
      loadingAudio.current.play();
    } else if (loadingAudio.current) {
      loadingAudio.current.pause();
      loadingAudio.current.currentTime = 0; // Reset the audio to the beginning
    }
  }, [isLoading]);

  // Function to generate a new soup
  const handleCreateSoup = (event: React.FormEvent) => {
    event.preventDefault();
    const newSoup: string = createSoup(modes);
    setGeneratedSoup(newSoup);
    onSoupGenerated(newSoup);
    console.log('Soup was generated');
  };

    // Function to generate a recipe for the current soup
    const handleGenerateRecipe = async () => {
      if (!generatedSoup) {
        alert('Please generate a soup first!');
        return;
      }
      setIsLoading(true);
      try {
        const generatedRecipe: string = await getRecipeFromOpenAI(generatedSoup);
        setRecipe(generatedRecipe);
      } catch (error) {
        console.error('No soup for you!:', error);
      } finally {
        setIsLoading(false);
      }
    };

  // Function to download the recipe as a text file
  const downloadRecipe = () => {
    const element: HTMLAnchorElement = document.createElement('a');
    const file: Blob = new Blob([recipe], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'soup-recipe.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className='created'>
      <form id="generate" onSubmit={handleCreateSoup}>
        <button id="soup-btn" type="submit">Generate Soup</button>
      </form>

      {generatedSoup && (
        <div>
          <Soup generatedSoup={generatedSoup} onGenerateRecipe={handleGenerateRecipe} />
        </div>
      )}

      {/* {isLoading && <p>Generating recipe...</p>} */}
      {recipe && (
        <div className='recipe-container'>
          <h2>Recipe:</h2>
          <pre>{recipe}</pre>
          <button id="soup-btn" type="button" onClick={downloadRecipe}>Download Recipe</button>
        </div>
      )}
    </div>
  );
};

export default Generate;
