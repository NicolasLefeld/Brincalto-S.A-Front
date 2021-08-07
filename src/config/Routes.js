import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../views/Auth';
import Landing from '../views/Landing';
import Oil from '../views/Oil';
import Spare from '../views/Spare';
import Client from '../views/Client';
import User from '../views/User';
import Provider from '../views/Provider';
import PrivateRoute from '../util/PrivateRoute';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Auth} />
      <PrivateRoute path="/home" exact component={Landing} />
      <PrivateRoute path="/stock/oil" exact component={Oil} />
      <PrivateRoute path="/stock/oil/:oilId" exact component={Oil} />
      <PrivateRoute path="/stock/spare" exact component={Spare} />
      <PrivateRoute path="/client" exact component={Client} />
      <PrivateRoute path="/user" exact component={User} />
      <PrivateRoute path="/provider" exact component={Provider} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
