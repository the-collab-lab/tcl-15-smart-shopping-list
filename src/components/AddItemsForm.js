import React, { useState } from 'react';
import { db } from '../lib/firebase';

const AddItemsForm = () => {
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
    <form onSubmit={addToDatabase}>
      <label htmlFor="list-item">Add Item</label>
      <input
        className="form-input"
        name="list-item"
        id="list-item"
        onChange={handleChange}
        value={listItem}
      />
      <button>Add</button>
    </form>
  );
};

export default AddItemsForm;
