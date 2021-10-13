import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../util/PrivateRoute";

import Auth from "../views/Auth";
import Landing from "../views/Landing";
import Oil from "../views/Oil";
import Spare from "../views/Spare";
import Client from "../views/Client";
import User from "../views/User";
import Provider from "../views/Provider";
import Products from "../views/Products";
import Purchases from "../views/Purchases";
import PurchasesByProvider from "../views/PurchasesByProvider";
import SalesByClient from "../views/SalesByClient";
import Invoices from "../views/Sales/Invoices";
import Remitos from "../views/Sales/Remitos";
import Charges from "../views/Charges";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Auth} />
      <PrivateRoute path="/home" exact component={Landing} />
      <PrivateRoute path="/stock/oil" exact component={Oil} />
      <PrivateRoute path="/stock/oil/:oilId" exact component={Oil} />
      <PrivateRoute path="/stock/spare" exact component={Spare} />
      <PrivateRoute path="/clients" exact component={Client} />
      <PrivateRoute path="/user" exact component={User} />
      <PrivateRoute path="/provider" exact component={Provider} />
      <PrivateRoute path="/products" exact component={Products} />
      <PrivateRoute path="/purchases/new" exact component={Purchases} />
      <PrivateRoute
        path="/purchases/cc"
        exact
        component={PurchasesByProvider}
      />
      <PrivateRoute path="/sales/invoices" exact component={Invoices} />
      <PrivateRoute path="/sales/remitos" exact component={Remitos} />
      <PrivateRoute path="/sales/cc" exact component={SalesByClient} />
      <PrivateRoute path="/treasury/charges" exact component={Charges} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
