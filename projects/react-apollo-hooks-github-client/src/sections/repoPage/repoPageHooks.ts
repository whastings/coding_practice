import gql from 'graphql-tag'
import { useApolloClient, useMutation, useQuery } from 'react-apollo'
import { useParams } from 'react-router-dom'
import { DocumentNode } from 'graphql'

import { RepoQuery, RepoQueryVariables } from './types/RepoQuery'
import { AddStarMutation, AddStarMutationVariables } from './types/AddStarMutation'
import { RemoveStarMutation, RemoveStarMutationVariables } from './types/RemoveStarMutation'

const STARRED_REPO = gql`
  fragment StarredRepo on Repository {
    viewerHasStarred
    stargazers {
      totalCount
    }
  }
`

const REPO_QUERY = gql`
  query RepoQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      ...StarredRepo
    }
  }

  ${STARRED_REPO}
`

const ADD_STAR_MUTATION = gql`
  mutation AddStarMutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        ...StarredRepo
      }
    }
  }

  ${STARRED_REPO}
`

const REMOVE_STAR_MUTATION = gql`
  mutation RemoveStarMutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        ...StarredRepo
      }
    }
  }

  ${STARRED_REPO}
`

const useReadQuery = <Query, QueryVariables>(
  query: DocumentNode,
  variables: QueryVariables
): Query | null => {
  const client = useApolloClient()
  try {
    return client.readQuery<Query, QueryVariables>({ query, variables })
  } catch(e) {
    return null
  }
}

export const useToggleStarMutation = () => {
  const { owner, name } = useParams<RepoQueryVariables>()
  const repoData = useReadQuery<RepoQuery, RepoQueryVariables>(
    REPO_QUERY,
    { owner, name },
  )
  const id = repoData ? repoData.repository!.id : ''
  const viewerHasStarred = repoData ? repoData.repository!.viewerHasStarred : false

  const addStarResult = useMutation<AddStarMutation, AddStarMutationVariables>(
    ADD_STAR_MUTATION,
    {
      variables: { id },
    },
  )
  const removeStarResult = useMutation<RemoveStarMutation, RemoveStarMutationVariables>(
    REMOVE_STAR_MUTATION,
    {
      variables: { id },
    },
  )
  return viewerHasStarred ? removeStarResult : addStarResult
}

export const useRepoQuery = () => {
  const { owner, name } = useParams<RepoQueryVariables>()
  const { data, loading } = useQuery<RepoQuery, RepoQueryVariables>(
    REPO_QUERY,
    {
      variables: { owner, name },
    }
  )

  return {
    data,
    loading,
  }
}
