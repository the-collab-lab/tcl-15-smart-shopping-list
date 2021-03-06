import React from 'react';
import '../css/components/HowSoonOptions.css';

const HowSoonOptions = ({ itemName }) => (
  <fieldset className="fieldset">
    <legend className="legend">
      How soon will you buy {itemName ? itemName : '...'}?
    </legend>
    {howSoonData.map((obj) => (
      <RadioButton type="radio" name="how-soon" key={obj.id} {...obj} />
    ))}
  </fieldset>
);

export default HowSoonOptions;

const RadioButton = ({ id, title, desc, ...rest }) => (
  <label className="option">
    <input id={id} {...rest} />
    <span className={`optionLbl ${id}-option`}>
      {title} ({' '}
      <small>
        {' '}
        <i>{desc}</i>{' '}
      </small>
      )
    </span>
  </label>
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
