import React from "react";
import {Route, HashRouter, Switch} from "react-router-dom";
import './App.css';

import Authenticate from "./components/Authenticate";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import withAuth from "./components/withAuth";

//create wrapper

function App() {
  return (
    <div className='app'>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Authenticate} />
          <Route path="/home" component={withAuth(Feed)} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;