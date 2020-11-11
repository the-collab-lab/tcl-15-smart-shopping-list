import React from 'react';
import {
  fromMilliSecToHours,
  getUTCNowInMilliSec,
  fromMilliSecToDays,
  isOutOfDate,
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

  // This function specifies what color each item should have based on how soon the item is to be bought.
  // also return arial-label each item should have
  const getStatusAndAriaLabel = ({
    howSoon,
    numberOfPurchases,
    recentPurchase,
  }) => {
    //If numberOfPurchase is <= 1 or is outOfDate, return inactive .
    if (numberOfPurchases <= 1 || isOutOfDate(howSoon, recentPurchase)) {
      return ['inactive', 'inactive item'];
    }

    return howSoon <= 7
      ? ['soon', 'Next purchase within 7 days']
      : howSoon > 7 && howSoon < 30
      ? ['kind-of-soon', 'Next purchase within 30 days']
      : ['not-soon', 'Next purchase within more than 30 days'];
  };

  const [status, ariaLabel] = getStatusAndAriaLabel(listItem);

  return (
    <li
      key={listItem.name}
      className={`list-item ${status}-item`}
      aria-label={ariaLabel}
    >
      <label
        aria-label="Check item as purchased"
        htmlFor={listItem.name}
      ></label>
      <input
        type="checkbox"
        className="check-item"
        onChange={() => checkItem()}
        disabled={isChecked}
        checked={isChecked}
        id={listItem.name}
      />
      <div className="item-name">{listItem.name}</div>
    </li>
  );
};

export default ListItem;
