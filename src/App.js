import React from "react";
import Home from "./views/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./assets/styles/master.scss";



function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/search/:keyword" component={Home}></Route>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
