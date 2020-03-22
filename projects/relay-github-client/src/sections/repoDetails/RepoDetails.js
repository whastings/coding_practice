// @flow
import React from 'react'
import { createFragmentContainer } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'
import type { RepoDetails_repo } from '__generated__/RepoDetails_repo.graphql'

type Props = {
  repo: RepoDetails_repo,
}

const RepoDetails = (props: Props) => {
  return (
    <article>
      <h2>{props.repo.name}</h2>
    </article>
  )
}

export default createFragmentContainer(
  RepoDetails,
  {
    repo: graphql`
      fragment RepoDetails_repo on Repository {
        id
        name
      }
    `
  }
)
