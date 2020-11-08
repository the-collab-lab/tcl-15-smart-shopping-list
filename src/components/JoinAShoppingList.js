import React, { useState } from 'react';
import { userShoppingList } from '../lib/shoppingListsCollection';
import Form from './Form';

const JoinAShoppingList = ({ onSharedToken }) => {
  const [error, setError] = useState(false);

  const handleSubmit = (e, inputValue) => {
    userShoppingList(inputValue)
      .get()
      .then((data) => {
        data.exists ? onSharedToken(inputValue) : setError(true);
      });
  };

  return (
    <div className="join-shopping-list">
      <h3>JOIN A SHOPPING LIST</h3>
      <Form
        onSubmit={handleSubmit}
        inputField={{ input: { placeholder: 'Enter a three word token' } }}
        submitBtn={{ text: 'Submit' }}
        className="join-shopping-list-form"
      />
      {error && (
        <div className="token-error">Shopping list does not exist.</div>
      )}
    </div>
  );
};

export default JoinAShoppingList;
