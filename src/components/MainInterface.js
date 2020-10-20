import React from 'react';
import generateToken from '../lib/tokens';
import { setToken } from '../lib/TokenService';
import JoinAShoppingList from './JoinAShoppingList';

const MainIterface = ({ setHasToken }) => {
  const handleSettingToken = (sharedToken) => {
    if (sharedToken) {
      setToken(sharedToken);
    } else {
      const token = generateToken();
      setToken(token);
      alert('New token generated');
    }
    setHasToken(true);
  };

  return (
    <main className="main-interface">
      <h1>Smart Shopping List</h1>
      <button className="button-token" onClick={() => handleSettingToken()}>
        Create New List
      </button>
      <p>- or -</p>
      <JoinAShoppingList onSharedToken={handleSettingToken} />
    </main>
  );
};

export default MainIterface;
