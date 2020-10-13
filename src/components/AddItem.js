import React, { useState } from 'react';
import { db } from '../lib/firebase';
import '../css/components/AddItemsForm.css';

const AddItem = () => {
  let [inputValue, setInputValue] = useState('');

  const addToDatabase = (e) => {
    e.preventDefault();

    db.collection('items')
      .add({
        name: inputValue,
        added_on: Date.now(),
        last_purchased: null,
        token: 'number',
        how_soon: e.target['how-soon'].value,
      })
      .then((res) => {
        setInputValue('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="add-item-form">
      <h1 className="app-name">Smart Shopping List</h1>
      <form onSubmit={addToDatabase} className="add-item">
        <div className="add-item-label">
          <label htmlFor="form-input">Item name:</label>
          <div>
            <input
              label="Item"
              className="form-input"
              name="form-input"
              id="form-input"
              onChange={handleInputChange}
              value={inputValue}
              placeholder="Enter Item"
            />
          </div>
        </div>

        <div className="time-frame-options">
          <h3>How soon will you buy this item?</h3>
          <div>
            {howSoonData.map((obj) => (
              <RadioButton type="radio" name="how-soon" key={obj.id} {...obj} />
            ))}
          </div>
        </div>

        <button className="add-item-btn">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;

const RadioButton = ({ id, title, desc, ...rest }) => (
  <div className="radio-button">
    <input {...rest} />
    <label htmlFor={id}> {title} </label>
    {/* <span> {desc} </span> */}
  </div>
);

const howSoonData = [
  {
    title: 'Soon',
    desc: 'Within 7 days.',
    id: 'soon',
    value: 7,
  },
  {
    title: 'Kind of Soon',
    desc: 'Within 14 days.',
    id: 'kind-of-soon',
    value: 14,
  },
  {
    title: 'Not Soon',
    desc: 'Within 30 Days',
    id: 'not-soon',
    value: 30,
  },
];

/* TODO - COMMENTS 

- Give feedback when the item is added (should we send the user to the list view? add an alert message? or a setTimeOut with a temporary message?)
- Group the radio buttons with a fieldset element to help screen reader users understand they've related (not sure how this works but will find out)
- Style the links at the bottom of the page
- Should we move the RadioButton component in its own js file? 

*/
