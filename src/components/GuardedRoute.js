import React from 'react';
import { Redirect } from 'react-router-dom';
import { checkToken } from '../lib/TokenService';

const GuardedRoute = (Component) => ({ match }) => {
  if (!checkToken()) {
    return <Redirect to="/" />;
  } else {
    return <Component match={match} />;
  }
};

export default GuardedRoute;
