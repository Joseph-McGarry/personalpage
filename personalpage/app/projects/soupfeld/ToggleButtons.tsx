// ToggleButtons.tsx

import React, { useState } from 'react';
import './styles/toggle.css';  // Link to your CSS file

interface Modes {
  seafoodMode: boolean;
  veggieMode: boolean;
  bizarroMode: boolean;
}

interface ToggleButtonsProps {
  setModes: React.Dispatch<React.SetStateAction<Modes>>;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({ setModes }) => {
  const [seafoodMode, setSeafoodMode] = useState<boolean>(false);
  const [veggieMode, setVeggieMode] = useState<boolean>(false);
  const [bizarroMode, setBizarroMode] = useState<boolean>(false);

  // Toggle Handlers
  const toggleSeafoodMode = () => {
    const newSeafoodMode = !seafoodMode;
    setSeafoodMode(newSeafoodMode);
    setModes((prevModes) => ({ ...prevModes, seafoodMode: newSeafoodMode }));
  };

  const toggleVeggieMode = () => {
    const newVeggieMode = !veggieMode;
    setVeggieMode(newVeggieMode);
    setModes((prevModes) => ({ ...prevModes, veggieMode: newVeggieMode }));
  };

  const toggleBizarroMode = () => {
    const newBizarroMode = !bizarroMode;
    setBizarroMode(newBizarroMode);
    setModes((prevModes) => ({ ...prevModes, bizarroMode: newBizarroMode }));
  };

  return (
    <div className="toggle-container">
      {/* Seafood Mode Toggle */}
      <div className="toggle-wrapper">
        <div onClick={toggleSeafoodMode} className={`toggle ${seafoodMode ? 'toggled' : ''}`}>
          <div className="thumb"></div>
        </div>
        <span className="toggle-text">Seafood Mode</span>
        <span className="toggle-text">{seafoodMode ? 'ON' : 'OFF'}</span>
      </div>

      {/* Veggie Mode Toggle */}
      <div className="toggle-wrapper">
        <div onClick={toggleVeggieMode} className={`toggle ${veggieMode ? 'toggled' : ''}`}>
          <div className="thumb"></div>
        </div>
        <span className="toggle-text">Veggie Mode</span>
        <span className="toggle-text">{veggieMode ? 'ON' : 'OFF'}</span>
      </div>

      {/* Bizarro Mode Toggle */}
      <div className="toggle-wrapper">
        <div onClick={toggleBizarroMode} className={`toggle ${bizarroMode ? 'toggled' : ''}`}>
          <div className="thumb"></div>
        </div>
        <span className="toggle-text">Bizzaro Mode</span>
        <span className="toggle-text">{bizarroMode ? 'ON' : 'OFF'}</span>
      </div>
    </div>
  );
};

export default ToggleButtons;
