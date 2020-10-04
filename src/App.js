import React, { useState } from 'react';
import { db } from './lib/firebase';
import './App.css';

function App() {
  let [listItem, setListItem] = useState('');
  //created function and variable list item

  const addToDatabase = (e) => {
    e.preventDefault();
    db.collection('items')
      .add({
        title: listItem,
      })
      .then((res) => {
        setListItem('');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // handle any changes that might happen to input-form
  const handleChange = (e) => {
    setListItem(e.target.value);
  };
  return (
    <div className="App">
      <form onSubmit={addToDatabase}>
        <label htmlFor="list-item">Add Item</label>
        {/* whatever I write here is going to be stored into listItem
        okay, i understand. can you please share your screen so i can see if it's working in your localhost?
        */}
        <input
          className="form-input"
          name="list-item"
          id="list-item"
          onChange={handleChange}
          value={listItem}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default App;
