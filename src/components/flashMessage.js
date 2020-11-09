import React, { useState, useEffect } from 'react';
import Bus from '../lib/bus';

const FlashMessage = () => {
  const intialMessage = { content: '', type: '' };
  const [message, setMessage] = useState(intialMessage);

  useEffect(() => {
    let timeoutId;
    Bus.addListener('flash', ({ content, type }) => {
      displayMessage(content, type);
      timeoutId = setTimeout(() => setMessage(intialMessage), 5000);
    });

    return () => clearTimeout(timeoutId);
  }, [message, intialMessage]);

  const displayMessage = (content, type) => {
    setMessage({ content, type });
  };

  return (
    <p role="alert" className={message.type} displayMessage={displayMessage}>
      {message.content}
    </p>
  );
};

export default FlashMessage;
