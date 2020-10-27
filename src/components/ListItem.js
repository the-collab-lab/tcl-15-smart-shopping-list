import React from 'react';
import { fromMilleToHours } from '../lib/helper';
import { shoppingLists } from '../lib/shoppingListsCollection';

const ListItem = ({ listItem, index, items, listId }) => {
  const checkItem = (index, item) => {
    items[index] = {
      ...item,
      lastPurchased: Date.now(),
    };

    shoppingLists().doc(listId).update({
      items,
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
