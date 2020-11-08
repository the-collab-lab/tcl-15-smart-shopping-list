import React from 'react';
import {
  fromMilliSecToHours,
  getUTCNowInMilliSec,
  fromMilliSecToDays,
} from '../lib/helper';
import { shoppingLists } from '../lib/shoppingListsCollection';
import calculateEstimate from '../lib/estimates';
import { getToken } from '../lib/TokenService';

const ListItem = ({ listItem, itemId }) => {
  const checkItem = () => {
    const updatedItem = {
      ...listItem,
      recentPurchase: getUTCNowInMilliSec(),
      previousPurchase: listItem.recentPurchase,
      numberOfPurchases: listItem.numberOfPurchases + 1,
    };

    if (updatedItem.previousPurchase) {
      const latestInterval =
        fromMilliSecToDays(updatedItem.recentPurchase) -
        fromMilliSecToDays(updatedItem.previousPurchase);

      const estimate = calculateEstimate(
        updatedItem.howSoon,
        latestInterval,
        updatedItem.numberOfPurchases,
      );
      updatedItem.howSoon = estimate;
    }

    shoppingLists()
      .doc(getToken())
      .update({
        [itemId]: updatedItem,
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
    </li>
  );
};

export default ListItem;
