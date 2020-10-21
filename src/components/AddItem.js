import '../css/components/main.css';
import React, { useState } from 'react';
import { db, firebase } from '../lib/firebase';
import HowSoonOptions from './HowSoonOptions';
import '../css/components/AddItemsForm.css';
import AddItemInput from './AddItemInput';
import { getToken } from '../lib/TokenService';
import { existingName, getItemsNamesFromDoc } from '../lib/helper';

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

  const resetForm = () => {
    setInputValue('');
    document.getElementById('soon').checked = true;
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
      .where('token', '==', getToken())
      .get()
      .then((data) => {
        if (data.docs.length) {
          const itemsNames = getItemsNamesFromDoc(data.docs[0]);

          if (existingName(itemsNames, newItem.name)) {
            displayMessage(
              `The item: ${newItem.name} already exists!!`,
              'error',
            );
            return;
          }

          shoppingLists.doc(data.docs[0].id).update({
            items: firebase.firestore.FieldValue.arrayUnion(newItem),
          });
        } else {
          shoppingLists.add({
            token: getToken(),
            items: [newItem],
          });
        }

        displayMessage('Successfully Added', 'success');
        resetForm();
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
      <p role="alert" className={messageType}>
        {message}
      </p>
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
