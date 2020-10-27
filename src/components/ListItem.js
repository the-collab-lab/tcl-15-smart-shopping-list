import React from 'react';
import { fromMilleToHours } from '../lib/helper';
import { getToken } from '../lib/TokenService';
import { shoppingLists, getShoppingList } from '../lib/shoppingListsCollection';

const ListItem = ({ listItem, index }) => {
  const checkItem = (index, item) => {
    getShoppingList(getToken())
      .then((data) => {
        const items = data.docs[0].data().items;
        items[index] = {
          ...item,
          lastPurchased: Date.now(),
        };

        shoppingLists().doc(data.docs[0].id).update({
          items,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isChecked = fromMilleToHours(listItem.lastPurchased) < 24;

  return (
    <li key={listItem.name} className="list-item">
      <input
        type="checkbox"
        className="check-item"
        onChange={() => checkItem(index, listItem)}
        disabled={isChecked}
        checked={isChecked}
      />
      <div className="item-name">{listItem.name}</div>
    </li>
  );
};

export default ListItem;
