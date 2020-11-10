import React, { useState, useEffect } from 'react';
import Bus from '../lib/bus';

const FlashMessage = () => {
  const intialMessage = { content: '', type: '' };
  const [message, setMessage] = useState(intialMessage);

  useEffect(() => {
    Bus.addListener('flash', ({ content, type }) => {
      displayMessage(content, type);
    });

    const timeoutId = setTimeout(() => setMessage(intialMessage), 2000);

    // Using the cleanup function to reset timeout
    // and remove all the listeners from EventEmitter(Bus) so we don't have a memory leak!!
    return () => {
      clearTimeout(timeoutId);
      Bus.removeAllListeners('flash');
    };
  }, [message, intialMessage]);

  const displayMessage = (content, type) => {
    setMessage({ content, type });
  };

  return (
    <p role="alert" className={message.type}>
      {message.content}
    </p>
  );
};

export default FlashMessage;
