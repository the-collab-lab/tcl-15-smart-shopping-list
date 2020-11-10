import React from 'react';
import {
  fromMilliSecToHours,
  getUTCNowInMilliSec,
  fromMilliSecToDays,
} from '../lib/helper';
import { userShoppingList } from '../lib/shoppingListsCollection';
import calculateEstimate from '../lib/estimates';

const ListItem = ({ listItem, itemId }) => {
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

  const isOutOfDate = (howSoon, recentPurchase) => {
    return (
      fromMilliSecToDays(getUTCNowInMilliSec()) -
        fromMilliSecToDays(recentPurchase) >
      howSoon * 2
    );
  };

  const handleColors = ({ howSoon, numberOfPurchases, recentPurchase }) => {
    if (numberOfPurchases <= 1 || isOutOfDate(howSoon, recentPurchase)) {
      return 'inactive';
    }

    return howSoon <= 7
      ? 'soon'
      : howSoon > 7 && howSoon < 30
      ? 'kind-of-soon'
      : 'not-soon';
  };

  const backgroundColor = handleColors(listItem);

  return (
    <li key={listItem.name} className={`list-item ${backgroundColor}-item`}>
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
