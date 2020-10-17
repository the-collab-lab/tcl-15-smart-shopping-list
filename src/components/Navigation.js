import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/components/main.css';
import '../css/components/Navigation.css';

const Navigation = ({ hasToken }) => {
  return (
    <div className="navlinks">
      <NavLink activeClassName="selected" className="not-selected" to="/" exact>
        Home
      </NavLink>
      {hasToken && (
        <NavLink
          activeClassName="selected"
          className="not-selected"
          to="/list"
          exact
        >
          List
        </NavLink>
      )}
      {hasToken && (
        <NavLink
          activeClassName="selected"
          className="not-selected"
          to="/add"
          exact
        >
          Add Item
        </NavLink>
      )}
    </div>
  );
};

export default Navigation;
