import React from 'react';
import { formatDate, calculateNextPurchase } from '../lib/helper';
import '../css/components/modal.css';

const ListItemDetails = ({ listItem, isShowModal, hideModal }) => {
  const toggleModal = isShowModal ? 'display-block' : 'display-none';
  return (
    <div className={`modal ${toggleModal}`} onClick={hideModal}>
      <div className="modal-container">
        <div className="modal--header" tabIndex="0">
          <h1>{listItem.name}</h1>
          <hr />
        </div>
        <div className="modal-body" tabIndex="0">
          {listItem.recentPurchase ? (
            <div className="item-details">
              <p>
                <span>Last purchased:</span>{' '}
                {formatDate(listItem['recentPurchase'])}
              </p>
              <p>
                <span>Next purchase: </span>
                {formatDate(
                  calculateNextPurchase(
                    listItem['howSoon'],
                    listItem['recentPurchase'],
                  ),
                )}
              </p>
              <p>
                You have purchased this item{' '}
                <span>{listItem['numberOfPurchases']} </span>
                time
                {listItem['numberOfPurchases'] > 1 && 's'}.
              </p>
            </div>
          ) : (
            <p>No recorded purchases yet</p>
          )}
        </div>
        <button
          onClick={hideModal}
          className="close-btn"
          aria-label="Close item details window"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
export default ListItemDetails;
