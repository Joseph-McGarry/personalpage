// Soup.tsx

import React from "react";

interface SoupProps {
  generatedSoup: string;
}

const Soup: React.FC<SoupProps> = ({ generatedSoup }) => {
  const handleSaveSoup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add logic to save the generated soup here
    console.log("Soup saved:", generatedSoup);
  };

  return (
    <div>
      <form className="soup-container" onSubmit={handleSaveSoup}>
        <div className="soup">
          <h2>Best soup in the City!</h2>
          <h3>{generatedSoup}</h3>
          {/* <button type="submit">Save Soup</button> */}
          <br />
        </div>
      </form>
    </div>
  );
};

export default Soup;
