import React from 'react';
import getToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';
import '../css/components/main.css';
import { setToken } from '../lib/TokenService';

const Welcome = ({ hasToken, setHasToken }) => {
  let history = useHistory();
  const handleClick = () => {
    const token = getToken();
    setToken(token);
    setHasToken(true);
    alert('New Token generated');
    history.push('/list');
  };

  return (
    <div className="welcome">
      <br />
      <h1 className="header">Welcome to your Smart shopping list</h1>
      <br />
      <button className="button-token" onClick={handleClick}>
        Create a new list
      </button>
    </div>
  );
};

export default Welcome;
