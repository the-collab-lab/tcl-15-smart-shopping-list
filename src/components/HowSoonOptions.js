import React from 'react';

const HowSoonOptions = () => (
  <div className="time-frame-options">
    <h3>How soon will you buy this item?</h3>
    <div>
      {howSoonData.map((obj) => (
        <RadioButton type="radio" name="how-soon" key={obj.id} {...obj} />
      ))}
    </div>
  </div>
);

export default HowSoonOptions;

const RadioButton = ({ id, title, desc, ...rest }) => (
  <div className="radio-button">
    <input id={id} {...rest} />
    <label htmlFor={id}> {title}: </label>
    <span> {desc} </span>
  </div>
);

const howSoonData = [
  {
    title: 'Soon',
    desc: 'Within 7 days',
    id: 'soon',
    value: 7,
    defaultChecked: true,
  },
  {
    title: 'Kind of Soon',
    desc: 'Within 14 days',
    id: 'kind-of-soon',
    value: 14,
  },
  {
    title: 'Not Soon',
    desc: 'Within 30 days',
    id: 'not-soon',
    value: 30,
  },
];