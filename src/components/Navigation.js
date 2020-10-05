import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <NavLink to="/">List</NavLink>
      <NavLink to="/add">Add Item</NavLink>
    </div>
  );
};

export default Navigation;
