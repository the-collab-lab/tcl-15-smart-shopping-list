import React, { useState, useEffect } from 'react';
import HowSoonOptions from './HowSoonOptions';
import Form from './Form';
import { getToken } from '../lib/TokenService';
import { shoppingLists } from '../lib/shoppingListsCollection';
import { existingName } from '../lib/helper';
import '../css/components/AddItemsForm.css';
import { v4 as uuid } from 'uuid';

const AddItem = () => {
  const intialMessage = { content: '', type: '' };
  const [message, setMessage] = useState(intialMessage);

  useEffect(() => {
    let timeout = setTimeout(() => setMessage(intialMessage), 2000);

    return () => clearTimeout(timeout);
  }, [message, intialMessage]);

  const displayMessage = (content, type) => {
    setMessage({ content, type });
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
      <p role="alert" className={message.type}>
        {message.content}
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
