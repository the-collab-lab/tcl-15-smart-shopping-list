import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/components/main.css';

const Navigation = () => {
  return (
    <div className="navlinks">
      <NavLink activeClassName="selected" className="welcome" to="/" exact>
        Welcome Page
      </NavLink>
      <NavLink activeClassName="selected" className="list" to="/list" exact>
        List Page
      </NavLink>
      <NavLink activeClassName="selected" className="add" to="/add" exact>
        Add Item Page
      </NavLink>
    </div>
  );
};

export default Navigation;
