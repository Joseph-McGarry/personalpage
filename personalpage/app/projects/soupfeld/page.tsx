'use client';
import { useState, useRef, useEffect } from 'react';
import Soup from './soupGen';
import './styles/soup.css'; 
import Generate from './Generate';
import soupImage from '../../assets/soup2.png';
import ToggleButtons from './ToggleButtons';
import Image from 'next/image';

interface Modes {
  seafoodMode: boolean;
  veggieMode: boolean;
  bizarroMode: boolean;
}

const App: React.FC = () => {
  const [soup, setSoup] = useState<string>('');
  const [modes, setModes] = useState<Modes>({
    seafoodMode: false,
    veggieMode: false,
    bizarroMode: false,
  });

  const handleSoupGenerated = (generatedSoup: string) => {
    setSoup(generatedSoup);
  };

  // Effect to toggle body background based on bizarro mode
  useEffect(() => {
    if (modes.bizarroMode) {
      document.body.classList.add('bizarroMode-checkered');
    } else {
      document.body.classList.remove('bizarroMode-checkered');
    }
  }, [modes.bizarroMode]); // Runs whenever bizarroMode is toggled

  return (
    <div className="app-container">
      <h1>Vandelay Industries Presents</h1>
      <Image
          src="/soup2.png"
          alt="soup"
          width={500}  
          height={300} 
          className="w-72 md:w-[28rem] lg:w-[32rem] h-auto"
        />
      <ToggleButtons setModes={setModes} />
      <Generate modes={modes} onSoupGenerated={handleSoupGenerated} />
    </div>
  );
};

export default App;

