// // Generate.tsx


// import React, { useState, useEffect, useRef } from 'react';
// import { createSoup } from './soupGen';
// import Soup from './Soup';
// import { getRecipeFromOpenAI } from './openAi'; 

// interface Modes {
//   seafoodMode: boolean;
//   veggieMode: boolean;
//   bizarroMode: boolean;
// }

// interface GenerateProps {
//   modes: Modes;
//   onSoupGenerated: (generatedSoup: string) => void;
// }

// const Generate: React.FC<GenerateProps> = ({ modes, onSoupGenerated }) => {
//   const [generatedSoup, setGeneratedSoup] = useState<string>(''); // State to store the generated soup
//   const [recipe, setRecipe] = useState<string>(''); // State to store the generated recipe
//   const [isLoading, setIsLoading] = useState<boolean>(false);  // To show a loader when generating the recipe

//   // Load the audio file using useRef to prevent reinitialization
//   const loadingAudio = useRef(new Audio('/intro-1.mp3'));

//   // Play the audio when `isLoading` becomes true
//   useEffect(() => {
//     if (isLoading) {
//       loadingAudio.current.play();
//     } else {
//       loadingAudio.current.pause(); // Stop the audio if loading is set to false
//       loadingAudio.current.currentTime = 0; // Reset the audio to the beginning
//     }
//   }, [isLoading]);

//   const handleCreateSoup = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setIsLoading(true);

//     try {
//       // Generate the soup using modes
//       const newSoup: string = createSoup(modes);  // Pass modes to the create function
//       setGeneratedSoup(newSoup);
//       onSoupGenerated(newSoup);  // Call the parent callback to update the App component
//       console.log("Soup was generated");

//       // Query OpenAI API to generate the recipe for the generated soup
//       const generatedRecipe: string = await getRecipeFromOpenAI(newSoup);
//       setRecipe(generatedRecipe);

//       setIsLoading(false);
//     } catch (error) {
//       console.error("No soup for you!:", error);
//       setIsLoading(false);
//     }
//   };

//   // Function to download the recipe as a text file
//   const downloadRecipe = () => {
//     const element: HTMLAnchorElement = document.createElement('a');
//     const file: Blob = new Blob([recipe], { type: 'text/plain' });
//     element.href = URL.createObjectURL(file);
//     element.download = 'soup-recipe.txt';
//     document.body.appendChild(element); // Required for this to work in FireFox
//     element.click();
//     document.body.removeChild(element); // Clean up
//   };

//   return (
//     <div className='created'>
//       <form id="generate" onSubmit={handleCreateSoup}>
//         <button id="soup-btn" type="submit">Generate Soup</button>
//       </form>

//       {/* Conditionally render the Soup component only if generatedSoup is not empty */}
//       {generatedSoup && (
//         <div>
//           <Soup generatedSoup={generatedSoup} />
//         </div>
//       )}

//       {/* Display loader or generated recipe */}
//       {isLoading && <p>Generating recipe...</p>}
//       {recipe && (
//         <div className='recipe-container'>
//           <h2>Recipe:</h2>
//           <pre>{recipe}</pre>
//           <button id="soup-btn" type="button" onClick={downloadRecipe}>Download Recipe</button>
//         </div>
//       )}
//     </div>
//   );
// };

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

  const handleCreateSoup = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newSoup: string = createSoup(modes);
      setGeneratedSoup(newSoup);
      onSoupGenerated(newSoup);
      console.log("Soup was generated");

      const generatedRecipe: string = await getRecipeFromOpenAI(newSoup);
      setRecipe(generatedRecipe);
      setIsLoading(false);
    } catch (error) {
      console.error("No soup for you!:", error);
      setIsLoading(false);
    }
  };

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
          <Soup generatedSoup={generatedSoup} />
        </div>
      )}

      {isLoading && <p>Generating recipe...</p>}
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
