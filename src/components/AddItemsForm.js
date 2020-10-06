import React, { useState } from 'react';
import { db } from '../lib/firebase';
import '../css/components/AddItemsForm.css';

const AddItemsForm = () => {
  let [listItem, setListItem] = useState('');
  //created function and variable list item

  const addToDatabase = (e) => {
    e.preventDefault();
    db.collection('items')
      .add({
        name: listItem,
        added_on: Date.now(),
      })
      .then((res) => {
        setListItem('');
        alert('Successfully added to database, YAY!!!');
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
    <form onSubmit={addToDatabase} className="add-item-form">
      <label htmlFor="list-item">Item</label>
      <input
        className="form-input"
        name="list-item"
        id="list-item"
        onChange={handleChange}
        value={listItem}
        placeholder="Add Item"
      />
      <button className="add-item-btn">Add</button>
    </form>
  );
};

export default AddItemsForm;
