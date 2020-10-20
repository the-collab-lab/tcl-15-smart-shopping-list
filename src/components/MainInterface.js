import React from 'react';
import generateToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';
import { setToken } from '../lib/TokenService';
import JoinAShoppingList from './JoinAShoppingList';

const MainIterface = ({ setHasToken }) => {
  let history = useHistory();
  const handleClick = () => {
    const token = generateToken();
    setToken(token);
    setHasToken(true);
    alert('New Token generated');
    history.push('/list');
  };

  return (
    <main>
      <button className="button-token" onClick={handleClick}>
        Create a new list
      </button>
      <p>- or -</p>
      <JoinAShoppingList />
    </main>
  );
};

export default MainIterface;
