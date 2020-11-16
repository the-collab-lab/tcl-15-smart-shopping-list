import React from 'react';
import '../css/components/modal.css';

const ListItemDetails = ({ listItem, isShowModal, hideModal }) => {
  const toggleModal = isShowModal ? 'display-block' : 'display-none';
  return (
    <div className={`modal ${toggleModal}`}>
      <h1>{listItem.name}</h1>
      <button onClick={hideModal}>X</button>
    </div>
  );
};
export default ListItemDetails;
