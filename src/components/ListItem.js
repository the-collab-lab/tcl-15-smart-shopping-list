import React from 'react';
import { firebase } from '../lib/firebase';
import {
  fromMilliSecToHours,
  getUTCNowInMilliSec,
  fromMilliSecToDays,
  displayMessage,
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
          displayMessage(`${listItem.name} deleted successfully`, 'success');
        })
        .catch((res) => {
          displayMessage(`Something went wrong, Sorry!`, 'error');
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
        aria-label="Mark this item as purchased"
      />
      <div className="item-name">{listItem.name}</div>
      <button
        onClick={removeItem}
        className="delete-icon"
        aria-label="Delete this item from your shopping list"
      >
        <i className="fas fa-trash"></i>
      </button>
    </li>
  );
};

export default ListItem;
