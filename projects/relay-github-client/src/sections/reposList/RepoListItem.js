// @flow
import React from 'react'
import { createFragmentContainer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

import type { RepoListItem_repo } from '__generated__/RepoListItem_repo.graphql'

type Props = {
  repo: RepoListItem_repo,
}

const RepoListItem = (props: Props) => {
  return (
    <li>
      {props.repo.name}
    </li>
  )
}

export default createFragmentContainer(
  RepoListItem,
  {
    repo: graphql`
      fragment RepoListItem_repo on Repository {
        name
        owner {
          login
        }
      }
    `,
  }
)
