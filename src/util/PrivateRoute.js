import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAdmin, isLogin } from './authHelper';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (props.location.pathname === '/user') {
          return isLogin() && isAdmin() ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          );
        }
        return isLogin() ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
