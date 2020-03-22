// @flow
import React, { useState } from 'react'
import { createFragmentContainer, commitMutation, type RelayProp } from 'react-relay'
import graphql from 'babel-plugin-relay/macro'

import type { RepoListItem_repo } from '__generated__/RepoListItem_repo.graphql'
import type {
  RepoListItemAddStarMutationResponse,
  RepoListItemAddStarMutationVariables,
} from '__generated__/RepoListItemAddStarMutation.graphql'
import type {
  RepoListItemRemoveStarMutationResponse,
  RepoListItemRemoveStarMutationVariables,
} from '__generated__/RepoListItemRemoveStarMutation.graphql'
import RepoDetailsContainer from 'sections/repoDetails/RepoDetailsContainer'

const ADD_STAR_MUTATION = graphql`
  mutation RepoListItemAddStarMutation($starrableId: ID!) {
    addStar(input: { starrableId: $starrableId }) {
      starrable {
        ...RepoListItem_repo
      }
    }
  }
`

const REMOVE_STAR_MUTATION = graphql`
  mutation RepoListItemRemoveStarMutation($starrableId: ID!) {
    removeStar(input: { starrableId: $starrableId }) {
      starrable {
        ...RepoListItem_repo
      }
    }
  }
`

type Props = {
  relay: RelayProp,
  repo: RepoListItem_repo,
}

const RepoListItem = (props: Props) => {
  const [isMutationLoading, setIsMutationLoading] = useState(false)
  const [isShowingDetails, setIsShowingDetails] = useState(false)

  const handleMutationFinished = () => setIsMutationLoading(false)

  const addRepoStar = () => {
    const variables: RepoListItemAddStarMutationVariables = {
      starrableId: props.repo.id,
    }
    commitMutation<RepoListItemAddStarMutationResponse>(
      props.relay.environment,
      {
        mutation: ADD_STAR_MUTATION,
        variables: (variables: {}), // TODO: Why did we need to cast this?
        onCompleted: handleMutationFinished,
      },
    )
    setIsMutationLoading(true)
  }

  const removeRepoStar = () => {
    const variables: RepoListItemRemoveStarMutationVariables = {
      starrableId: props.repo.id,
    }
    commitMutation<RepoListItemRemoveStarMutationResponse>(
      props.relay.environment,
      {
        mutation: REMOVE_STAR_MUTATION,
        variables: (variables: {}), // TODO: Why did we need to cast this?
        onCompleted: handleMutationFinished,
      },
    )
    setIsMutationLoading(true)
  }

  return (
    <li
      style={{
        marginBottom: 10,
      }}
    >
      <button
        type="button"
        onClick={() => setIsShowingDetails(!isShowingDetails)}
      >
        {isShowingDetails ? '-' : '+'}
      </button>
      &nbsp;{props.repo.name}
      &nbsp;&ndash;
      Stars: {props.repo.stargazers.totalCount}
      &nbsp;&ndash;&nbsp;
      <button
        type="button"
        onClick={props.repo.viewerHasStarred ? removeRepoStar : addRepoStar}
        disabled={isMutationLoading}
      >
        {props.repo.viewerHasStarred ? 'Unstar' : 'Star'}
      </button>

      {isShowingDetails && (
        <RepoDetailsContainer
          name={props.repo.name}
          owner={props.repo.owner.login}
        />
      )}
    </li>
  )
}

export default createFragmentContainer(
  RepoListItem,
  {
    repo: graphql`
      fragment RepoListItem_repo on Repository {
        id
        name
        owner {
          login
        }
        viewerHasStarred
        stargazers {
          totalCount
        }
      }
    `,
  }
)
