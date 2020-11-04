import React from 'react';
import {
  fromMilliSecToHours,
  getUTCNowInMilliSec,
  fromMilliSecToDays,
} from '../lib/helper';
import { shoppingLists } from '../lib/shoppingListsCollection';
import calculateEstimate from '../lib/estimates';

const ListItem = ({ listItem, listId, itemId }) => {
  const checkItem = () => {
    const item = {
      ...listItem,
      recentPurchase: getUTCNowInMilliSec(),
      previousPurchase: listItem.recentPurchase,
      numberOfPurchases: (listItem.numberOfPurchases += 1),
    };

    if (item.previousPurchase) {
      const latestInterval =
        fromMilliSecToDays(item.recentPurchase) -
        fromMilliSecToDays(item.previousPurchase);

      const estimate = calculateEstimate(
        listItem.howSoon,
        latestInterval,
        item.numberOfPurchases,
      );
      item.howSoon = estimate;
    }

    shoppingLists()
      .doc(listId)
      .update({
        [itemId]: item,
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
