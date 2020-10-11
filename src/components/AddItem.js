import './main.css';
import React, { useState } from 'react';
import { items } from '../lib/firebase';
import '../css/components/AddItemsForm.css';

const AddItem = () => {
  let [inputValue, setInputValue] = useState('');

  const addToDatabase = (e) => {
    e.preventDefault();
    items()
      .add({
        name: inputValue,
        added_on: Date.now(),
      })
      .then((res) => {
        setInputValue('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <form onSubmit={addToDatabase} className="add-item-form">
      <label htmlFor="form-input">Item</label>
      <input
        className="form-input"
        name="form-input"
        id="form-input"
        onChange={handleInputChange}
        value={inputValue}
        placeholder="Add Item"
      />
      <button className="add-item-btn">Add</button>
    </form>
  );
};

export default AddItem;
