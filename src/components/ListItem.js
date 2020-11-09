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

  const handleColors = () => {
    let { howSoon } = listItem;
    return howSoon < 7
      ? 'class-seven'
      : howSoon > 7 && howSoon < 30
      ? 'class-thirty'
      : 'class-above-thirty';
  };

  const backgroundColor = handleColors();

  return (
    <li key={listItem.name} className={`list-item ${backgroundColor}`}>
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

// 1) Add the last purchase date to howSoon (in milliseconds) * 2
// 2) Compare the above to Date.now()
// 3) If 2 > 1 || noOfPurchases == 1, item is inactive and should have a different color

export default ListItem;
