import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/components/Navigation.css';

const Navigation = ({ hasToken }) => {
  return (
    <nav className="navlinks">
      {hasToken && (
        <NavLink
          activeClassName="selected"
          className="not-selected"
          to="/"
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
          Add
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
