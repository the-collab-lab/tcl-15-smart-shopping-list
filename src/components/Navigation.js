import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/components/main.css';
import '../css/components/Navigation.css';


const Navigation = ({ hasToken }) => {
  return (
    <div className="navlinks">
      <NavLink activeClassName="selected" className="home" to="/" exact>
        Home
      </NavLink>
    <div className="nav-links">
      <NavLink activeClassName="selected" className="not-selected" to="/" exact>
        List View
      </NavLink>
      <NavLink
        activeClassName="selected"
        className="not-selected"
        to="/add"
        exact >
        Add Item
      </NavLink>
    
      {hasToken && (
        <NavLink activeClassName="selected" className="list" to="/list" exact>
          List
        </NavLink>
      )}
      {hasToken && (
        <NavLink activeClassName="selected" className="add" to="/add" exact>
          Add Item
        </NavLink>
      )}
    </div>
  );
};

export default Navigation;
