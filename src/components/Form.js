import React, { useState } from 'react';
import InputField from './InputField';
import { Button } from 'react-bootstrap';

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
        labelProps={inputField.label}
        inputProps={{
          ...inputField.input,
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
        }}
      />
      {children}
      <Button type="submit" variant="warning">
        {submitBtn.text}
      </Button>
    </form>
  );
};

export default Form;
