// @flow
import React from 'react'
import { createPaginationContainer} from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
import type { RelayPaginationProp } from 'react-relay'

import type { ReposList_viewerReposData } from '__generated__/ReposList_viewerReposData.graphql'
import RepoListItem from './RepoListItem'

type Props = {
  relay: RelayPaginationProp,
  viewerReposData: ReposList_viewerReposData,
}

const ReposList = (props: Props) => {
  const { repositories } = props.viewerReposData

  if (!repositories.edges) {
    return null
  }

  return (
    <>
      <ul>
        {repositories.edges.map((edge) => (edge && edge.node && (
          <RepoListItem key={edge.node.id} repo={edge.node} />
        )))}
      </ul>
      {props.relay.hasMore() && (
        <button type="button" onClick={() => props.relay.loadMore(10)}>
          Load More
        </button>
      )}
    </>
  )
}

export default createPaginationContainer(
  ReposList,
  {
    viewerReposData: graphql`
      fragment ReposList_viewerReposData on User @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
      ) {
        repositories(
          first: $count,
          after: $cursor
        ) @connection(key: "ReposList_repositories") {
          edges {
            cursor
            node {
              id
              ...RepoListItem_repo
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getVariables(props, { count, cursor }) {
      return { count, cursor }
    },
    query: graphql`
      query ReposListPaginationQuery($count: Int!, $cursor: String) {
        viewer {
          ...ReposList_viewerReposData @arguments(count: $count, cursor: $cursor)
        }
      }
    `
  },
)
