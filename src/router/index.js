import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Count from "../pages/Count.jsx";
const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      <Link to="/">toHome</Link>&emsp;|&emsp;
      <Link to="/count">toCount</Link>
    </header>
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/count" exact component={Count} />
      </Switch>
    </main>
  </div>
);

export default PrimaryLayout;
