import React from 'react';
import icon from '../assets/icon3.png';

const Header = () => {
  return (
    <header className="header">
      <div>
        <img className="icon" src={icon} alt="icon" />
        <span className="icon-title text-white">SmartCart</span>
      </div>
    </header>
  );
};

export default Header;
