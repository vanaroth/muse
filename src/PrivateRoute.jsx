import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({ children, authorisation = false, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authorisation.isAuthenticated ? (
          children
        ) : authorisation.isAuthenticated === null ? (
          <Redirect
            to={{
              pathname: '/load',
              state: { from: location },
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
