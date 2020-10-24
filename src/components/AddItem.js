import React from 'react';
import { firebase } from '../lib/firebase';
import HowSoonOptions from './HowSoonOptions';
import Form from './Form';
import { getToken } from '../lib/TokenService';
import { shoppingLists, getShoppingList } from '../lib/shoppingListsCollection';
import '../css/components/AddItemsForm.css';

const AddItem = () => {
  const addToDatabase = (e, inputValue, setInputValue) => {
    const newItem = {
      name: inputValue,
      lastPurchased: null,
      howSoon: e.target['how-soon'].value,
    };

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
