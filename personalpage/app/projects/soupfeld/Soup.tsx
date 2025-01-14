import React from "react";

interface SoupProps {
  generatedSoup: string;
  onGenerateRecipe: () => void; // New prop for the button click handler
}

const Soup: React.FC<SoupProps> = ({ generatedSoup, onGenerateRecipe }) => {
  const handleSaveSoup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Soup saved:", generatedSoup);
  };

  return (
    <div>
      <form className="soup-container" onSubmit={handleSaveSoup}>
        <div className="soup">
          {/* <h3>Best soup in the City!</h3> */}
          <h3>{generatedSoup}</h3>
          <br />
          {/* Add the Generate Recipe button */}
          <button 
            type="button" 
            id="soup-btn" 
            onClick={onGenerateRecipe}
          >
            Generate Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default Soup;
