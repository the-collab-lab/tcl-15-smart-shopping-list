import '../css/components/main.css';
import React, { useState } from 'react';
import { db, firebase } from '../lib/firebase';
import HowSoonOptions from './HowSoonOptions';
import '../css/components/AddItemsForm.css';
import AddItemInput from './AddItemInput';
import { getToken } from '../lib/TokenService';

const AddItem = () => {
  let [inputValue, setInputValue] = useState('');

  const addToDatabase = (e) => {
    const shoppingLists = db.collection('shoppingLists');

    const newItem = {
      name: inputValue,
      lastPurchased: null,
      howSoon: e.target['how-soon'].value,
    };

    e.preventDefault();

    shoppingLists
      // fetch the token from localSorage
      .where('token', '==', getToken())
      .get()
      .then((data) => {
        // if the shoppingList with the token 801 exists
        if (data.docs.length) {
          shoppingLists
            .doc(data.docs[0].id)
            // just append the new item to that shoppingList items
            .update({
              items: firebase.firestore.FieldValue.arrayUnion(newItem),
            });
        } else {
          // else just create a new list and add that item to it
          shoppingLists.add({
            // fetch the token from localSorage
            token: getToken(),
            items: [newItem],
          });
        }
        alert('Successfully Added');
        setInputValue('');
        // reset radio buttons
        document.getElementById('soon').checked = true;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="add-item-form">
      <h1 className="app-name">Smart Shopping List</h1>
      <form onSubmit={addToDatabase} className="add-item">
        <AddItemInput
          id="form-input"
          inputValue={inputValue}
          handleInputChange={handleInputChange}
        />

        <HowSoonOptions />

        <button className="add-item-btn">Add</button>
      </form>
    </div>
  );
};

export default AddItem;
