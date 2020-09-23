import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import AdminRoute from "layouts/Admin";
import UserRoute from "layouts/User";
import AuthRoute from "layouts/Auth";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import "assets/scss/App.scss";

import { Landing, Profile, Home } from "views/User";
import { Login, Register } from "views/Auth";
import NotFound from "layouts/NotFound";

import { Provider } from "react-redux";
import store from "redux/store";
import { getRoles, loadUser } from "redux/actions/authActions";
import Dashboard from "views/Admin/Dashboard";
import { ListUsers } from "views/Admin/ListUsers";

const hist = createBrowserHistory();

const App = () => {
  const token = localStorage.getItem("token");
  useEffect(() => {
    store.dispatch(getRoles());
  }, []);
  useEffect(() => {
    if (token) {
      store.dispatch(loadUser());
    }
  }, [token]);

  return (
    <Provider store={store}>
      <Router history={hist}>
        <Switch>
          <UserRoute path="/" exact component={Landing} />
          <UserRoute path="/home" component={Home} />
          <UserRoute path="/profile" auth component={Profile} />
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/register" component={Register} />
          <Redirect path="/admin" exact to="/admin/dashboard" />
          <AdminRoute path="/admin/dashboard" component={Dashboard} />
          <AdminRoute path="/admin/users" component={ListUsers} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
