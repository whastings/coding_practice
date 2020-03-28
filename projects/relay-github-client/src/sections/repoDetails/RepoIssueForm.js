// @flow
import React, { useState } from 'react'
import graphql from 'babel-plugin-relay/macro'
import { commitMutation, type RelayProp } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'

import type {
  RepoIssueFormCreateMutationResponse,
  RepoIssueFormCreateMutationVariables
} from '__generated__/RepoIssueFormCreateMutation.graphql'

const CREATE_ISSUE_MUTATION = graphql`
  mutation RepoIssueFormCreateMutation($repoId: ID!, $title: String!, $body: String) {
    createIssue(input: { repositoryId: $repoId, title: $title, body: $body }) {
      issue {
        id
        ...IssueListItem_issue
      }
    }
  }
`

type Props = {
  repoId: string,
  relay: RelayProp,
}

const RepoIssueForm = (props: Props) => {
  const [titleValue, setTitleValue] = useState('')
  const [bodyValue, setBodyValue] = useState('')

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    const variables: RepoIssueFormCreateMutationVariables = {
      repoId: props.repoId,
      title: titleValue,
      body: bodyValue,
    }
    commitMutation<RepoIssueFormCreateMutationResponse>(
      props.relay.environment,
      {
        mutation: CREATE_ISSUE_MUTATION,
        variables: (variables: {}), // TODO: Why did we need to cast this?
        updater(store) {
          const createIssueResult = store.getRootField('createIssue')
          const newIssue = createIssueResult.getLinkedRecord('issue')
          const repo = store.get(props.repoId)
          const issuesConnection = ConnectionHandler.getConnection(
            repo,
            'RepoDetails_issues',
          )
          const issueEdge = ConnectionHandler.createEdge(store, issuesConnection, newIssue)
          ConnectionHandler.insertEdgeAfter(issuesConnection, issueEdge)
        },
        onCompleted(response, errors) {
          if (!errors || !errors.length) {
            setTitleValue('')
            setBodyValue('')
          }
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title-input' style={{ display: 'block' }}>
          Title
        </label>
        <input
          id='title-input'
          value={titleValue}
          onChange={(event) => setTitleValue(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor='body-input' style={{ display: 'block' }}>
          Body
        </label>
        <textarea
          id='body-input'
          value={bodyValue}
          rows={10}
          cols={30}
          onChange={(event) => setBodyValue(event.target.value)}
        ></textarea>
      </div>
      <button type='submit'>Add</button>
    </form>
  )
}

export default RepoIssueForm
