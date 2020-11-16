import React, { useState } from 'react';
import { firebase } from '../lib/firebase';
import {
  fromMilliSecToHours,
  getUTCNowInMilliSec,
  fromMilliSecToDays,
  isOutOfDate,
  displayMessage,
} from '../lib/helper';
import { userShoppingList } from '../lib/shoppingListsCollection';
import calculateEstimate from '../lib/estimates';
import ListItemDetails from './ListItemDetails';
const ListItem = ({ listItem, itemId }) => {
  const [showModal, setShowModal] = useState(false);
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

  // This function specifies which color each item should have based on how soon the item is to be bought.
  // also it returns the arial-label each item should have
  const getStatusAndAriaLabel = ({ howSoon, recentPurchase }) => {
    if (isOutOfDate(howSoon, recentPurchase))
      return ['inactive', 'inactive item'];

    switch (true) {
      case howSoon <= 7:
        return ['soon', 'Next purchase within 7 days'];
      case howSoon > 7 && howSoon < 30:
        return ['kind-of-soon', 'Next purchase within 30 days'];
      default:
        return ['not-soon', 'Next purchase within more than 30 days'];
    }
  };

  const [status, ariaLabel] = getStatusAndAriaLabel(listItem);

  return (
    <li key={listItem.name} className={`list-item ${status}-item`}>
      <div
        className={`item-name ${isChecked ? 'line-through' : ''}`}
        aria-label={ariaLabel}
      >
        {listItem.name}
      </div>
      <input
        type="checkbox"
        className="check-item"
        onChange={() => checkItem()}
        disabled={isChecked}
        checked={isChecked}
        aria-label={isChecked ? 'Purchased item' : 'Check to mark as purchased'}
      />
      <button
        onClick={removeItem}
        className="delete-icon"
        aria-label="Delete this item from your shopping list"
      >
        <i className="fas fa-trash"></i>
      </button>
      <button className="item-details-icon" onClick={() => setShowModal(true)}>
        Details
      </button>
      {showModal && (
        <ListItemDetails
          listItem={listItem}
          isShowModal={showModal}
          hideModal={() => setShowModal(false)}
        />
      )}
    </li>
  );
};

export default ListItem;
