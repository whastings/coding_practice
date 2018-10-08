import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Navigation from './components/Navigation';
import Organization from './components/Organization';
import Profile from './components/Profile';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <hr />
          <Route exact path="/" component={Organization} />
          <Route exact path="/profile" component={Profile} />
        </div>
      </Router>
    );
  }
}

export default App;
