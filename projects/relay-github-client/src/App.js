// @flow
import React from 'react';
import graphql from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'

import relayEnvironment from './relayEnvironment'
import './App.css';

const VIEWER_QUERY = graphql`
  query AppQuery {
    viewer {
      id
      login
    }
  }
`

function App() {
  return (
    <div className="App">
      <QueryRenderer
        environment={relayEnvironment}
        query={VIEWER_QUERY}
        render={({ error, props }) => {
          if (!props) {
            return (
              <div>Loading...</div>
            )
          }

          return (
            <div>Logged in as: {props.viewer.login}</div>
          )
        }}
      />
    </div>
  );
}

export default App;
