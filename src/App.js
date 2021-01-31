import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantdetailPage from "./routes/RestaurantdetailPage";
import UpdatePage from "./routes/UpdatePage";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/restaurants/:id/update" component={UpdatePage} />
          <Route exact path="/restaurants/:id" component={RestaurantdetailPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
