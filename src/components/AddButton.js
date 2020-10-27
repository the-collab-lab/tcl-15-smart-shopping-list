import React from 'react';
import { useHistory } from 'react-router-dom';

function AddButton() {
  let history = useHistory();

  const handleClick = () => {
    history.push('/add');
  };

  return (
    <div>
      <p>Your list is currently empty</p>
      <button onClick={handleClick}>Add Item</button>
    </div>
  );
}

export default AddButton;
