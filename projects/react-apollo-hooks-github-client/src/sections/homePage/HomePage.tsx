import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

import { OwnReposQuery, OwnReposQueryVariables } from './types/OwnReposQuery'

export const OWN_REPOS_QUERY = gql`
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

const HomePage: React.FC = () => {
  const { data, loading } = useQuery<OwnReposQuery, OwnReposQueryVariables>(
    OWN_REPOS_QUERY,
    {
      variables: { first: 5 },
    }
  )

  if (loading || !data) {
    return (
      <strong>Loading...</strong>
    )
  }

  const ownRepos = data.viewer.repositories.nodes || []

  return (
    <>
      <h1>Your Repos</h1>
      <ul>
        {ownRepos.map((repo) => (
          <li key={repo!.name}>
            {repo!.name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default HomePage
