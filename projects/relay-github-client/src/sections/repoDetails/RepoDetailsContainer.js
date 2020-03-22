// @flow
import React from 'react'
import graphql from 'babel-plugin-relay/macro'
import { QueryRenderer } from 'react-relay'

import relayEnvironment from 'relayEnvironment'
import type {
  RepoDetailsContainerQueryResponse,
  RepoDetailsContainerQueryVariables,
} from '__generated__/RepoDetailsContainerQuery.graphql'
import RepoDetails from './RepoDetails'

const REPO_QUERY = graphql`
  query RepoDetailsContainerQuery($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      ...RepoDetails_repo
    }
  }
`

type Props = {
  name: string,
  owner: string
}

const RepoDetailsContainer = (props: Props) => {
  const variables: RepoDetailsContainerQueryVariables = {
    name: props.name,
    owner: props.owner,
  }

  return (
    <QueryRenderer
      environment={relayEnvironment}
      query={REPO_QUERY}
      variables={(variables: {})}
      render={({ props }) => {
        const data = (props: ?RepoDetailsContainerQueryResponse)
        if (!data || !data.repository) {
          return (
            <div>Loading...</div>
          )
        }

        return (
          <RepoDetails repo={data.repository} />
        )
      }}
    />
  )
}

export default RepoDetailsContainer
