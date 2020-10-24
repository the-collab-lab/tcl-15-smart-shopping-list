import React from 'react';

const InputField = ({ inputProps, labelProps }) => {
  return (
    <label className={labelProps.className}>
      <span> {labelProps.name}</span>
      <input type="text" {...inputProps} required />
    </label>
  );
};

export default InputField;
