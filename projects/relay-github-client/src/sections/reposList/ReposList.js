// @flow
import React from 'react'
import { createFragmentContainer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

import type { ReposList_viewerReposData } from './__generated__/ReposList_viewerReposData.graphql'
import RepoListItem from './RepoListItem'

type Props = {
  viewerReposData: ReposList_viewerReposData,
}

const ReposList = (props: Props) => {
  const { repositories } = props.viewerReposData

  if (!repositories.nodes) {
    return null
  }

  return (
    <ul>
      {repositories.nodes.map((repo) => (repo && (
        <RepoListItem key={repo.id} repo={repo} />
      )))}
    </ul>
  )
}

export default createFragmentContainer(
  ReposList,
  {
    viewerReposData: graphql`
      fragment ReposList_viewerReposData on User {
        repositories(first: 10) {
          nodes {
            id
            ...RepoListItem_repo
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `,
  },
)
