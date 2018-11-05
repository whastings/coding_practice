import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withApollo } from 'react-apollo';

import './App.css';
import Navigation from './components/Navigation';
import Organization from './components/Organization';
import Profile from './components/Profile';
import { CURRENT_USER_QUERY } from './graphql';

class App extends Component {
  componentDidMount() {
    this.prefetchProfile();
  }

  prefetchProfile() {
    const { client } = this.props;
    client.query({
      query: CURRENT_USER_QUERY,
    });
  }

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

export default withApollo(App);
