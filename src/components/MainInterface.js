import React from 'react';
import generateToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';
import { setToken } from '../lib/TokenService';
import JoinAShoppingList from './JoinAShoppingList';

const MainIterface = ({ setHasToken }) => {
  let history = useHistory();

  const handleSettingToken = (sharedToken) => {
    if (sharedToken) {
      setToken(sharedToken);
    } else {
      const token = generateToken();
      setToken(token);
      alert('New token generated');
    }
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
