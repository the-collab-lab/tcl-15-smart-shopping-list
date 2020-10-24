import React, { useState } from 'react';
import InputField from './InputField';

const Form = (props) => {
  const [inputValue, setInputValue] = useState('');
  const { onSubmit, className, inputField, submitBtn, children } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e, inputValue, setInputValue);
  };
  return (
    <form onSubmit={handleSubmit} className={className}>
      <InputField
        labelProps={inputField.label ? inputField.label : ''}
        inputProps={{
          ...inputField.input,
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
        }}
      />
      {children}
      <button className={submitBtn.className}>{submitBtn.text}</button>
    </form>
  );
};

export default Form;
