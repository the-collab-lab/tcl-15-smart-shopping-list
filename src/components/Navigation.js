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
          aria-label="List"
          exact
        >
          <i className="fas fa-list"></i>
        </NavLink>
      )}
      {hasToken && (
        <NavLink
          activeClassName="selected"
          className="not-selected"
          to="/add"
          aria-label="Add"
          exact
        >
          <i className="fas fa-plus-circle"></i>
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
