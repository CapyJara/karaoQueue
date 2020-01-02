import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Splash from '../components/pages/Splash';

export default function App() {
  return (
    <Router >
      <Switch>
        <Route exact path="/" component={Splash} />
      </Switch>
    </Router>
  );
}
