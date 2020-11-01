import React from 'react';
import { useHistory } from 'react-router-dom';

function AddButton() {
  let history = useHistory();

  const handleClick = () => {
    history.push('/add');
  };

  return (
    <div className="empty-list">
      <p>Your shopping list is currently empty.</p>
      <button className="add-item-btn" onClick={handleClick}>
        Add Item
      </button>
    </div>
  );
}

export default AddButton;
