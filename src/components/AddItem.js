import React, { useState } from 'react';
import { firebase } from '../lib/firebase';
import HowSoonOptions from './HowSoonOptions';
import Form from './Form';
import { getToken } from '../lib/TokenService';
import { shoppingLists, getShoppingList } from '../lib/shoppingListsCollection';
import { existingName } from '../lib/helper';
import '../css/components/AddItemsForm.css';

const AddItem = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  let timeoutId;

  const displayMessage = (message, type) => {
    clearTimeout(timeoutId);
    setMessage(message);
    setMessageType(type);
    timeoutId = hideMessage();
  };

  const hideMessage = () => {
    return setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const resetForm = (setInputValue) => {
    setInputValue('');
    document.getElementById('soon').checked = true;
  };

  const addToDatabase = (e, inputValue, setInputValue) => {
    const newItem = {
      name: inputValue,
      lastPurchased: null,
      howSoon: e.target['how-soon'].value,
    };

    getShoppingList(getToken())
      .then((data) => {
        if (data.docs.length) {
          if (existingName(data.docs[0], newItem.name)) {
            displayMessage(
              `The item: ${newItem.name} already exists!!`,
              'error',
            );
            return;
          }

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

        displayMessage('Successfully Added', 'success');
        resetForm(setInputValue);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="add-item-form">
      <h1 className="app-name">Smart Shopping List</h1>
      <p role="alert" className={messageType}>
        {message}
      </p>
      <Form
        onSubmit={addToDatabase}
        className="add-item"
        inputField={{
          input: { placeholder: 'Enter item name' },
          label: { name: 'Item Name', className: 'add-item-label' },
        }}
        submitBtn={{ text: 'Add', className: 'add-item-btn' }}
        children={<HowSoonOptions />}
      />
    </div>
  );
};

export default AddItem;
