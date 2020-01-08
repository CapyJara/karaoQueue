import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Splash from '../components/pages/Splash';
import Main from '../components/pages/Main';
import './app.css';

export default function App() {
  return (
    <Router >
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route  path="/:roomId" component={Main} />
      </Switch>
    </Router>
  );
}
