// @flow
import React from 'react'
import { createFragmentContainer, type RelayProp } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

import type { RepoDetails_repo } from '__generated__/RepoDetails_repo.graphql'

import RepoIssueForm from './RepoIssueForm'

type Props = {
  repo: RepoDetails_repo,
  relay: RelayProp,
}

const RepoDetails = (props: Props) => {
  const { edges: issueEdges } = props.repo.issues

  return (
    <article>
      <h2>{props.repo.name}</h2>
      <h3>Recent Issues</h3>
      <ul>
        {issueEdges && issueEdges.map((issueEdge) => issueEdge && issueEdge.node && (
          <li key={issueEdge.node.id}>
            {issueEdge.node.title}
          </li>
        ))}
      </ul>
      <h3>New Issue</h3>
      <RepoIssueForm repoId={props.repo.id} relay={props.relay} />
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
        issues(last: 10) @connection(key: "RepoDetails_issues") {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `
  }
)
