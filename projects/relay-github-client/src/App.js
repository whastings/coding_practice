// @flow
import React from 'react';
import graphql from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'

import relayEnvironment from './relayEnvironment'
import './App.css';
import ReposList from './sections/reposList/ReposList'
import type { AppQueryResponse } from './__generated__/AppQuery.graphql'

const VIEWER_QUERY = graphql`
  query AppQuery {
    viewer {
      id
      login
      ...ReposList_viewerReposData @arguments(count: 10)
    }
  }
`

function App() {
  return (
    <div>
      <QueryRenderer
        environment={relayEnvironment}
        query={VIEWER_QUERY}
        variables={{}}
        render={({ props }) => {
          if (!props) {
            return (
              <div>Loading...</div>
            )
          }
          const data = (props: AppQueryResponse)

          return (
            <main>
              <div>Logged in as: {data.viewer.login}</div>
              <ReposList viewerReposData={data.viewer} />
            </main>
          )
        }}
      />
    </div>
  );
}

export default App;
