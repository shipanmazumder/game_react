import React, { Component, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Spinner from "./components/shared/Spinner";
import PrivateRoute from "./components/PrivateRoute";

const Login = lazy(() => import("./pages/login/Login"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Game = lazy(() => import("./pages/game/Game"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/login" component={Login} exact />
            <PrivateRoute path="/" component={Dashboard} exact />
            <PrivateRoute path="/dashboard" component={Dashboard} exact  />
            <PrivateRoute path="/game" component={Game}  exact />
          </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
