import React from 'react';
import AddToDatabase from './components/AddToDatabase';
import ReturnItemsList from './components/ReturnItemsList';
import './css/App.css';

function App() {
  return (
    <div className="App">
      <AddToDatabase />
      <ReturnItemsList />
    </div>
  );
}

export default App;
