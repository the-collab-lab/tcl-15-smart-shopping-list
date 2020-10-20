import React from 'react';
import generateToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';
import { setToken } from '../lib/TokenService';
import JoinAShoppingList from './JoinAShoppingList';

const MainIterface = ({ setHasToken }) => {
  let history = useHistory();
  const handleSettingToken = (token) => {
    if (!token) {
      const token = generateToken();
      alert('New token generated');
    }

    setToken(token);
    setHasToken(true);
    history.push('/list');
  };

  return (
    <main>
      <button className="button-token" onClick={() => handleSettingToken()}>
        Create a new list
      </button>
      <p>- or -</p>
      <JoinAShoppingList onSharedToken={handleSettingToken} />
    </main>
  );
};

export default MainIterface;
