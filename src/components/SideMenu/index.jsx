import React, { useState } from 'react';
import './style.css'; // Import your CSS file for styling

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      <ul className="menu-items">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
};

export default SideMenu;
