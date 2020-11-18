import React from 'react';
import generateToken from '../lib/tokens';
import { setToken } from '../lib/TokenService';
import JoinAShoppingList from './JoinAShoppingList';
import { Button, Container } from 'react-bootstrap';

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
    <Container>
      <main className="main-interface">
        <h1 className="main-title">Welcome to your Smart Shopping List</h1>
        <Button onClick={() => handleSettingToken()} variant="info">
          Create New List
        </Button>
        <p className="main-or">- or -</p>
        <JoinAShoppingList onSharedToken={handleSettingToken} />
      </main>
    </Container>
  );
};

export default MainIterface;
