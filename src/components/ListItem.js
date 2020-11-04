import React from 'react';
import { fromMilleToHours } from '../lib/helper';
import { userShoppingList } from '../lib/shoppingListsCollection';

const ListItem = ({ listItem, itemId }) => {
  const checkItem = () => {
    userShoppingList().update({
      [itemId]: { ...listItem, lastPurchased: new Date().toUTCString() },
    });
  };

  const isChecked = fromMilleToHours(listItem.lastPurchased) < 24;

  return (
    <li key={listItem.name} className="list-item">
      <input
        type="checkbox"
        className="check-item"
        onChange={() => checkItem()}
        disabled={isChecked}
        checked={isChecked}
      />
      <div className="item-name">{listItem.name}</div>
    </li>
  );
};

export default ListItem;
