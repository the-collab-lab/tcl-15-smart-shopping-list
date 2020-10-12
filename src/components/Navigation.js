import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/components/main.css';

const Navigation = () => {
  return (
    <div className="navlinks">
      <NavLink activeClassName="selected" className="welcome" to="/" exact>
        Welcome
      </NavLink>
      <NavLink activeClassName="selected" className="list" to="/list" exact>
        List
      </NavLink>
      <NavLink activeClassName="selected" className="add" to="/add" exact>
        Add Item
      </NavLink>
    </div>
  );
};

export default Navigation;
