import React from 'react';
import { NavLink } from 'react-router-dom';
import './main.css';

const Navigation = () => {
  return (
    <div className="navlinks">
      <NavLink activeClassName="selected" className="list" to="/" exact>
        List
      </NavLink>
      <NavLink activeClassName="selected" className="add" to="/add" exact>
        Add Item
      </NavLink>
    </div>
  );
};

export default Navigation;
