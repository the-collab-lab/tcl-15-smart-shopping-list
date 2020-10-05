import React from 'react';
import { NavLink } from 'react-router-dom';
import './main.css';

const Navigation = () => {
  return (
    <div className="navlinks">
      <div className="list">
        <NavLink activeClassName="selected" to="/" exact>
          List
        </NavLink>
      </div>
      <div className="add">
        <NavLink activeClassName="selected" exact to="/add">
          Add Item
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
