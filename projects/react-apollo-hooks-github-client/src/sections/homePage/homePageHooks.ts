import { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'
import produce from 'immer'

import { OwnReposQuery, OwnReposQueryVariables } from './types/OwnReposQuery'

const REPOS_PER_PAGE = 3

const OWN_REPOS_QUERY = gql`
  query OwnReposQuery($first: Int!, $after: String) {
    viewer {
      repositories(first: $first, after: $after) {
        nodes {
          name
          owner {
            login
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`

const getRepos = (data: OwnReposQuery) => {
  return data.viewer.repositories.nodes || []
}

export const useOwnReposQuery = () => {
  const [loadingMore, setLoadingMore] = useState(false)
  const { data, fetchMore, loading } = useQuery<OwnReposQuery, OwnReposQueryVariables>(
    OWN_REPOS_QUERY,
    {
      variables: { first: REPOS_PER_PAGE },
    }
  )

  const fetchMoreWrapper = async () => {
    const { endCursor } = data!.viewer.repositories.pageInfo
    setLoadingMore(true)

    const result = await fetchMore({
      variables: { after: endCursor },
      updateQuery: (prevData, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevData
        }
        return produce(prevData, (updatedData) => {
          updatedData.viewer.repositories.nodes!.push(...(fetchMoreResult.viewer.repositories.nodes || []))
          updatedData.viewer.repositories.pageInfo = fetchMoreResult.viewer.repositories.pageInfo
        })
      },
    })
    setLoadingMore(false)
    return result
  }

  return {
    hasNextPage: !!data && data.viewer.repositories.pageInfo.hasNextPage,
    fetchMore: fetchMoreWrapper,
    loading,
    loadingMore,
    repos: data && getRepos(data),
  }
}
