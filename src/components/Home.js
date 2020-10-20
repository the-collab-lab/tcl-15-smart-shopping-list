import React from 'react';
import MainInterface from './MainInterface';
import List from './List';

const Home = ({ hasToken, setHasToken }) => {
  return (
    <div className="home">
      {!hasToken ? <MainInterface setHasToken={setHasToken} /> : <List />}
    </div>
  );
};

export default Home;
