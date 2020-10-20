import '../css/components/main.css';
import React, { useState } from 'react';
import { db, firebase } from '../lib/firebase';
import HowSoonOptions from './HowSoonOptions';
import '../css/components/AddItemsForm.css';
import AddItemInput from './AddItemInput';
import { getToken } from '../lib/TokenService';
import { existingName } from '../lib/FilterName';

const AddItem = () => {
  let [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const displayMessage = (message, type) => {
    setMessage(message);
    setMessageType(type);
    hideMessage();
  };

  const hideMessage = () => {
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };
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
        // if the shoppingList with the token exists
        if (data.docs.length) {
          let items = data.docs.map((doc) => doc.data().items);
          let namesArray = items[0].map((n) => n.name);

          if (!existingName(namesArray, newItem.name)) {
            shoppingLists
              .doc(data.docs[0].id)
              // just append the new item to that shoppingList items
              .update({
                items: firebase.firestore.FieldValue.arrayUnion(newItem),
              });
            displayMessage('Successfully Added', 'success');
          } else {
            displayMessage(
              `The item: ${newItem.name} already exists!!`,
              'error',
            );
          }
        } else {
          // else just create a new list and add that item to it
          shoppingLists.add({
            // fetch the token from localSorage
            token: getToken(),
            items: [newItem],
          });
          displayMessage('Successfully Added');
        }
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
      <p className={messageType}>{message}</p>
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
