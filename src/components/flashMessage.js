import React, { useState, useEffect } from 'react';
import Bus from '../lib/bus';

const FlashMessage = () => {
  const intialMessage = { content: '', type: '' };
  const [message, setMessage] = useState(intialMessage);
  const NUMBER_OF_MILLISEC_TO_WAIT = 2000;

  useEffect(() => {
    Bus.addListener('flash', ({ content, type }) => {
      displayMessage(content, type);
    });

    // remove all the listeners from EventEmitter(Bus) so we don't have a memory leak!!
    return () => {
      Bus.removeAllListeners('flash');
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (message.content) setMessage(intialMessage);
    }, NUMBER_OF_MILLISEC_TO_WAIT);

    // Using the cleanup function to reset timeout
    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, intialMessage]);

  const displayMessage = (content, type) => {
    setMessage({ content, type });
  };

  return (
    <p
      aria-live="assertive"
      aria-label={message.content}
      className={`flash-message ${message.type}`}
    >
      {message.content}
    </p>
  );
};

export default FlashMessage;
