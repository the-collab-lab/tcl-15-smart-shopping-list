import React from 'react';
import { firebase } from '../lib/firebase';
import Bus from '../lib/bus';

import {
  fromMilliSecToHours,
  getUTCNowInMilliSec,
  fromMilliSecToDays,
} from '../lib/helper';
import { userShoppingList } from '../lib/shoppingListsCollection';
import calculateEstimate from '../lib/estimates';

const ListItem = ({ listItem, itemId }) => {
  const removeItem = () => {
    const isOk = window.confirm(
      `Are you sure you want to delele ${listItem.name}?`,
    );
    if (isOk) {
      userShoppingList()
        .update({
          [itemId]: firebase.firestore.FieldValue.delete(),
        })
        .then((res) => {
          Bus.emit('flash', {
            content: `${listItem.name} deleted successfully`,
            type: 'success',
          });
        })
        .catch((res) => {
          Bus.emit('flash', {
            content: `Something went wrong, Sorry!!!`,
            type: 'error',
          });
        });
    }
  };

  const checkItem = () => {
    const previousPurchase = listItem.recentPurchase;
    listItem.recentPurchase = getUTCNowInMilliSec();
    listItem.numberOfPurchases += 1;

    if (previousPurchase) {
      const latestInterval =
        fromMilliSecToDays(listItem.recentPurchase) -
        fromMilliSecToDays(previousPurchase);

      const estimate = calculateEstimate(
        listItem.howSoon,
        latestInterval,
        listItem.numberOfPurchases,
      );
      listItem.howSoon = estimate;
    }

    userShoppingList().update({
      [itemId]: listItem,
    });
  };

  const isChecked =
    fromMilliSecToHours(getUTCNowInMilliSec() - listItem.recentPurchase) < 24;

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
      <span onClick={removeItem} className="delete-icon">
        <i className="fas fa-trash"></i>
      </span>
    </li>
  );
};

export default ListItem;
