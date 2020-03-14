// @flow
import React from 'react';
import graphql from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'

import relayEnvironment from './relayEnvironment'
import './App.css';
import ReposList from './sections/reposList/ReposList'

const VIEWER_QUERY = graphql`
  query AppQuery {
    viewer {
      id
      login
      ...ReposList_viewerReposData
    }
  }
`

function App() {
  return (
    <div>
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
            <main>
              <div>Logged in as: {props.viewer.login}</div>
              <ReposList viewerReposData={props.viewer} />
            </main>
          )
        }}
      />
    </div>
  );
}

export default App;
