import React, { useState } from 'react';
import HowSoonOptions from './HowSoonOptions';
import Form from './Form';
import { userShoppingList } from '../lib/shoppingListsCollection';
import { existingName, displayMessage } from '../lib/helper';
import '../css/components/AddItemsForm.css';
import { v4 as uuid } from 'uuid';
import FlashMessage from './flashMessage';

const AddItem = () => {
  const [itemName, setItemName] = useState('');

  const resetForm = (setInputValue) => {
    setInputValue('');
    document.getElementById('soon').checked = true;
    setItemName('');
  };

  const addToDatabase = (e, inputValue, setInputValue) => {
    const newItem = {
      name: inputValue,
      recentPurchase: null,
      howSoon: +e.target['how-soon'].value,
      numberOfPurchases: 0,
    };

    userShoppingList()
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
        userShoppingList()
          .set(
            {
              [uuid()]: newItem,
            },
            {
              merge: true,
            },
          )
          .then((success) => {
            displayMessage(
              `Successfully Added  ${newItem.name} to your list`,
              'success',
            );
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
    <main className="add-item-container">
      <h1 className="app-name">One more item?!</h1>
      <FlashMessage />
      <Form
        onSubmit={addToDatabase}
        className="add-item-form"
        inputField={{
          input: { placeholder: 'Enter item name' },
          label: { name: 'Item Name', className: 'add-item-label' },
          setName: (name) => setItemName(name),
        }}
        submitBtn={{
          text: 'add item',
          className: 'add-item-btn',
          icon: 'plus',
        }}
        children={<HowSoonOptions itemName={itemName} />}
      />
    </main>
  );
};

export default AddItem;
