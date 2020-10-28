import React, { useState } from 'react';
import HowSoonOptions from './HowSoonOptions';
import Form from './Form';
import { getToken } from '../lib/TokenService';
import { shoppingLists } from '../lib/shoppingListsCollection';
import { existingName } from '../lib/helper';
import '../css/components/AddItemsForm.css';
import { v4 as uuid } from 'uuid';

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

    shoppingLists()
      .doc(getToken())
      .get()
      .then((data) => {
        if (data.data()) {
          if (existingName(data.data(), newItem.name)) {
            displayMessage(
              `The item: ${newItem.name} already exists!!`,
              'error',
            );
            return;
          }
        }

        // add Item
        shoppingLists()
          .doc(getToken())
          .set(
            {
              [uuid()]: newItem,
            },
            {
              merge: true,
            },
          )
          .then((success) => {
            displayMessage('Successfully Added', 'success');
            resetForm(setInputValue);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
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
