import '../css/components/main.css';
import React, { useState } from 'react';
import { firebase } from '../lib/firebase';
import HowSoonOptions from './HowSoonOptions';
import AddItemInput from './AddItemInput';
import { getToken } from '../lib/TokenService';
import { shoppingLists, getShoppingList } from '../lib/shoppingListsCollection';
import '../css/components/AddItemsForm.css';

const AddItem = () => {
  let [inputValue, setInputValue] = useState('');

  const addToDatabase = (e) => {
    const newItem = {
      name: inputValue,
      lastPurchased: null,
      howSoon: e.target['how-soon'].value,
    };

    e.preventDefault();

    getShoppingList(getToken())
      .then((data) => {
        if (data.docs.length) {
          shoppingLists()
            .doc(data.docs[0].id)
            .update({
              items: firebase.firestore.FieldValue.arrayUnion(newItem),
            });
        } else {
          shoppingLists().add({
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

  return (
    <div className="add-item-form">
      <h1 className="app-name">Smart Shopping List</h1>
      <form onSubmit={addToDatabase} className="add-item">
        <AddItemInput
          id="form-input"
          inputValue={inputValue}
          handleInputChange={(e) => setInputValue(e.target.value)}
        />

        <HowSoonOptions />

        <button className="add-item-btn">Add</button>
      </form>
    </div>
  );
};

export default AddItem;
