import React from 'react';
import { getToken } from '../lib/TokenService';

const UserToken = () => {
  const handleCopyToken = () => {
    const copyDate = document.getElementById('user-token').innerHTML;
    navigator.clipboard.writeText(copyDate);
  };
  return (
    <div className="user-token">
      <b>
        Your token: "<span id="user-token">{getToken()}</span>"
      </b>
      <button aria-label="Copy token" onClick={handleCopyToken}>
        <i className="fa fa-clone"></i>
      </button>
    </div>
  );
};

export default UserToken;
