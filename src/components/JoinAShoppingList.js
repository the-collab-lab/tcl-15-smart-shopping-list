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
    <div className="join-shopping-list">
      <h3>JOIN A SHOPPING LIST</h3>
      <form onSubmit={handleSubmit} className="join-shopping-list-form">
        <input
          type="text"
          placeholder="Enter a three word token"
          onChange={handleChange}
          value={inputValue}
        />
        <button>Submit</button>
      </form>
      {error && (
        <div className="token-error">Shopping list does not exist.</div>
      )}
    </div>
  );
};

export default JoinAShoppingList;
