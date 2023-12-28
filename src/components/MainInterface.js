import React from 'react';
// import generateToken from '../lib/tokens';
import { setToken } from '../lib/TokenService';
import JoinAShoppingList from './JoinAShoppingList';
import { Container } from 'react-bootstrap';
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';

const MainIterface = ({ setHasToken }) => {
  const handleSettingToken = (sharedToken) => {
    if (sharedToken) {
      setToken(sharedToken);
    } else {
      console.log('Creating new lists is disabled');
      // const token = generateToken();
      // setToken(token);
    }
    setHasToken(true);
  };

  return (
    <Container>
      <main className="main-interface">
        <h1 className="main-title">Welcome to your Smart Shopping List</h1>
        <button
          className="create-new-list-btn"
          onClick={() => handleSettingToken()}
        >
          Create New List
        </button>
        <p className="main-or">- or -</p>
        <JoinAShoppingList onSharedToken={handleSettingToken} />
      </main>
      <ArchivalNoticeModal />
    </Container>
  );
};

export default MainIterface;
