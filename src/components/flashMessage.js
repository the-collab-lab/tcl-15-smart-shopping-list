import React, { useState, useEffect } from 'react';
import Bus from '../lib/bus';

const FlashMessage = () => {
  const intialMessage = { content: '', type: '' };
  const [message, setMessage] = useState(intialMessage);

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
    }, 2000);

    // Using the cleanup function to reset timeout
    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, intialMessage]);

  const displayMessage = (content, type) => {
    setMessage({ content, type });
  };

  return (
    <p aria-live="rude" aria-label={message.content} className={message.type}>
      {message.content}
    </p>
  );
};

export default FlashMessage;
