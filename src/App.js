import "./App.css";

import React from "react"
import {Route, HashRouter, Switch} from "react-router-dom"

import Authenticate from "./components/Authenticate";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Authenticate} />
          <Route path="/home" component={Feed} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;