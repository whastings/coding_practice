import { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import produce from 'immer'

import { ReposQuery, ReposQueryVariables } from './types/ReposQuery'

const REPOS_PER_PAGE = 3

export const REPOS_QUERY = gql`
  query ReposQuery($login: String!, $first: Int!, $after: String) {
    user(login:$login) {
      repositories(first: $first, after: $after) {
        nodes {
          id
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

const getRepos = (data: ReposQuery) => {
  return data.user?.repositories.nodes || []
}

export const useOwnReposQuery = (userLogin: string) => {
  const [loadingMore, setLoadingMore] = useState(false)
  const { data, fetchMore, loading } = useQuery<ReposQuery, ReposQueryVariables>(
    REPOS_QUERY,
    {
      variables: { first: REPOS_PER_PAGE, login: userLogin },
    }
  )

  const fetchMoreWrapper = async () => {
    const { endCursor } = data!.user!.repositories.pageInfo
    setLoadingMore(true)

    const result = await fetchMore({
      variables: { after: endCursor },
      updateQuery: (prevData, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevData
        }
        return produce(prevData, (updatedData) => {
          updatedData.user!.repositories.nodes!.push(...(fetchMoreResult.user!.repositories.nodes || []))
          updatedData.user!.repositories.pageInfo = fetchMoreResult.user!.repositories.pageInfo
        })
      },
    })
    setLoadingMore(false)
    return result
  }

  return {
    hasNextPage: !!data && data.user?.repositories.pageInfo.hasNextPage,
    fetchMore: fetchMoreWrapper,
    loading,
    loadingMore,
    repos: data && getRepos(data),
  }
}
