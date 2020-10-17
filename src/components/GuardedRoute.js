import React from 'react';
import { Redirect } from 'react-router-dom';
import { checkToken } from '../lib/TokenService';

const GuardedRoute = (Component) => ({ match }) => {
  return !checkToken() ? <Redirect to="/" /> : <Component match={match} />;
};

export default GuardedRoute;
