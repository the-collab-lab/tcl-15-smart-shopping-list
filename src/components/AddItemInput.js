import React from 'react';

const AddItemInput = ({ id, handleInputChange, inputValue }) => (
  <label className="add-item-label">
    <span>Item name:</span>
    <input
      label="Item"
      className={id}
      name={id}
      onChange={handleInputChange}
      value={inputValue}
      placeholder="Enter Item"
      required
    />
  </label>
);

export default AddItemInput;
