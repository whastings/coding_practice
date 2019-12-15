import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'

import { FollowersQuery, FollowersQueryVariables } from './types/FollowersQuery'

const FOLLOWERS_QUERY = gql`
  query FollowersQuery($login: String!) {
    user(login: $login) {
      followers(first: 50) {
        nodes {
          login
        }
      }
    }
  }
`

export const useFollowersQuery = (userLogin: string) => {
  const { data, loading } = useQuery<FollowersQuery, FollowersQueryVariables>(
    FOLLOWERS_QUERY,
    {
      variables: {
        login: userLogin,
      },
    }
  )

  return {
    followers: data && data.user?.followers.nodes,
    loading,
  }
}
