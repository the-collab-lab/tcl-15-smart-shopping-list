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
        last_purcharsed: null,
        token: 'number',
        how_soon: e.target['time-to-buy'].value,
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
    <form onSubmit={addToDatabase} className="add-item">
      <label htmlFor="form-input">Item</label>
      <input
        className="form-input"
        name="form-input"
        id="form-input"
        onChange={handleInputChange}
        value={inputValue}
        placeholder="Add Item"
      />
      <div>
        <p>How soon will you buy this item?</p>
        <label htmlFor="soon">Soon</label>
        <input type="radio" id="soon" name="time-to-buy" value="7" />

        <label htmlFor="kind-of-soon">Kind of Soon</label>
        <input type="radio" id="kind-of-soon" name="time-to-buy" value="14" />

        <label htmlFor="not-soon">Not Soon</label>
        <input type="radio" id="not-soon" name="time-to-buy" value="30" />
      </div>
      <button className="add-item-btn">Add</button>
    </form>
  );
};

export default AddItem;
