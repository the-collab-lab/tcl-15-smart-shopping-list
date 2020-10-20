import React from 'react';
import MainInterface from './MainInterface';
import List from './List';
import '../css/components/main.css';

const Home = ({ hasToken, setHasToken }) => {
  return (
    <div className="welcome">
      <h1 className="header">Welcome to your Smart shopping list</h1>
      {!hasToken ? <MainInterface setHasToken={setHasToken} /> : <List />}
    </div>
  );
};

export default Home;
