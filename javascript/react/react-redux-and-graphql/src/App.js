import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';
import HomePage from './sections/home/HomePage';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
}

export default App;
