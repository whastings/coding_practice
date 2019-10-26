import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

import { RepoQuery, RepoQueryVariables } from './types/RepoQuery'

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

export const useRepoQuery = ({ owner, name }: RepoQueryVariables) => {
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
