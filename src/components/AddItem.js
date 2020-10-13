import './main.css';
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
    <form onSubmit={addToDatabase} className="add-item">
      <div>
        <label htmlFor="form-input">Item</label>
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

      <div>
        <p>How soon will you buy this item?</p>
        <div>
          {howSoonData.map((obj) => (
            <RadioButton type="radio" name="how-soon" key={obj.id} {...obj} />
          ))}
        </div>
      </div>

      <button className="add-item-btn">Add</button>
    </form>
  );
};

export default AddItem;

const RadioButton = ({ id, title, desc, ...rest }) => (
  <div>
    <input {...rest} />
    <label htmlFor={id}>{title}</label>
    <span> {desc} </span>
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
