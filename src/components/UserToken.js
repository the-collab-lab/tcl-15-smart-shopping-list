import React from 'react';
import { getToken } from '../lib/TokenService';
import { displayMessage } from '../lib/helper';

const UserToken = () => {
  const handleCopyToken = () => {
    const copyData = document.getElementById('user-token').innerHTML;
    navigator.clipboard.writeText(copyData);
    displayMessage('List token is copied to clipboard', 'success');
  };
  return (
    <div className="user-token">
      <b>
        List token: "<span id="user-token">{getToken()}</span>"
      </b>
      <button aria-label="Copy token" onClick={handleCopyToken}>
        <i className="fa fa-clone"></i>
      </button>
    </div>
  );
};

export default UserToken;
