import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login/Login";
import "./App.css";
import Signup from "./Signup/Signup";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ResetPassword from "./ResetPassword/ResetPassword";
import Homepage from "./Homepage/Homepage";
import ActivateAccount from "./Activation/ActivateAccount";
import Shorten from "./ShortenPage/Shorten";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/" exact={true} component={Login} />
          <Route path="/create-account" exact={true} component={Signup} />
          <Route
            path="/activate-account/:token"
            exact={true}
            component={ActivateAccount}
          />
          <Route
            path="/forgot-password"
            exact={true}
            component={ForgotPassword}
          />
          <Route
            path="/reset-password/:token"
            exact={true}
            component={ResetPassword}
          />
          <Route path="/homepage" exact={true} component={Homepage} />
          <Route path="/shorten" exact={true} component={Shorten} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
