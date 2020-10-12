import React from 'react';
import { Redirect } from 'react-router-dom';

const GuardedRoute = (Component) => ({ match }) => {
  if (
    localStorage.getItem('token') === null ||
    localStorage.getItem('token').length === 0
  ) {
    return <Redirect to="/" />;
  } else {
    return <Component match={match} />;
  }
};

export default GuardedRoute;
