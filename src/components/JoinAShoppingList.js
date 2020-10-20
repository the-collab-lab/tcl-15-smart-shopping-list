import React, { useState } from 'react';
import { getShoppingList } from '../lib/shoppingListsCollection';

const JoinAShoppingList = ({ onSharedToken }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getShoppingList(inputValue).then((data) => {
      data.docs.length ? onSharedToken(inputValue) : setError(true);
    });
  };

  return (
    <div>
      JOIN A SHOPPING LIST
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="three word token"
          onChange={handleChange}
          value={inputValue}
        />
        <button>Submit</button>
      </form>
      {error && <div>There is no shopping list with that token </div>}
    </div>
  );
};

export default JoinAShoppingList;
