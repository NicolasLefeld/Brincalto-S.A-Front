import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Landing from '../views/Landing';
import Oil from '../views/Oil';
import Spare from '../views/Spare';
import Client from '../views/Client';
import Provider from '../views/Provider';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/stock/oil" exact component={Oil} />
      <Route path="/stock/oil/:oilId" exact component={Oil} />
      <Route path="/stock/spare" exact component={Spare} />
      <Route path="/client" exact component={Client} />
      <Route path="/provider" exact component={Provider} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
