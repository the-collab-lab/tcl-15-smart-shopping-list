import React from 'react';
import HowSoonOptions from './HowSoonOptions';
import Form from './Form';
import { userShoppingList } from '../lib/shoppingListsCollection';
import { existingName } from '../lib/helper';
import '../css/components/AddItemsForm.css';
import { v4 as uuid } from 'uuid';
import FlashMessage from './flashMessage';
import Bus from '../lib/bus';

const AddItem = () => {
  const resetForm = (setInputValue) => {
    setInputValue('');
    document.getElementById('soon').checked = true;
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
            Bus.emit('flash', {
              content: `The item: ${newItem.name} already exists!!`,
              type: 'error',
            });
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
            Bus.emit('flash', {
              content: 'Successfully Added',
              type: 'success',
            });
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
      <FlashMessage />
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
