import React, { useState } from 'react';
import { db, firebase } from '../lib/firebase';
import HowSoonOptions from './HowSoonOptions';
import '../css/components/AddItemsForm.css';
import AddItemInput from './AddItemInput';

const AddItem = () => {
  let [inputValue, setInputValue] = useState('');

  const addToDatabase = (e) => {
    const shoppingLists = db.collection('shoppingLists');

    const newItem = {
      name: inputValue,
      lastPurchased: null,
      howSoon: e.target['how-soon'].value,
    };

    e.persist();
    e.preventDefault();

    shoppingLists
      .where('token', '==', 801) // TODO => fetch the token from localSorage
      .get()
      .then((data) => {
        // if the shoppingList with the token 152 exists
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
            token: Math.floor(Math.random() * Math.floor(1000)), // TODO => fetch the token from localSorage
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

/* TODO - COMMENTS 

- Give feedback when the item is added (add an alert message? or a setTimeOut with a temporary message?)
- Group the radio buttons with a fieldset element to help screen reader users understand they've related (not sure how this works but will find out)

*/
