import React from 'react';

const AddItemInput = ({ id, handleInputChange, inputValue }) => (
  <div className="add-item-label">
    <label htmlFor={id}>Item name:</label>
    <div>
      <input
        label="Item"
        className={id}
        name={id}
        id={id}
        onChange={handleInputChange}
        value={inputValue}
        placeholder="Enter Item"
      />
    </div>
  </div>
);

export default AddItemInput;
