import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/components/Navigation.css';

const Navigation = () => {
  return (
    <div className="nav-links">
      <NavLink activeClassName="selected" className="not-selected" to="/" exact>
        List View
      </NavLink>
      <NavLink
        activeClassName="selected"
        className="not-selected"
        to="/add"
        exact
      >
        Add Item
      </NavLink>
    </div>
  );
};

export default Navigation;
