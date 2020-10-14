import React from 'react';
import { Redirect } from 'react-router-dom';
import { hasToken } from '../lib/TokenService';

const GuardedRoute = (Component) => ({ match }) => {
  if (!hasToken()) {
    return <Redirect to="/" />;
  } else {
    return <Component match={match} />;
  }
};

export default GuardedRoute;
