import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { MockedProvider, MockedResponse, wait } from '@apollo/react-testing'

import { useOwnReposQuery, OWN_REPOS_QUERY } from '../homePageHooks'

describe('homePageHooks', () => {
  const createRepo = ({ name, ownerName }: { name: string, ownerName: string }) => {
    return {
      name,
      owner: {
        login: ownerName,
        __typename: 'RepositoryOwner',
      },
      __typename: 'Repository',
    }
  }
  const reposPageOne = [
    createRepo({ name: 'repo1', ownerName: 'foo' }),
    createRepo({ name: 'repo2', ownerName: 'bar' }),
    createRepo({ name: 'repo3', ownerName: 'baz' }),
  ]
  const initialRequestMock = {
    request: {
      query: OWN_REPOS_QUERY,
      variables: { first: 3 },
    },
    result: {
      data: {
        viewer: {
          repositories: {
            nodes: reposPageOne,
            pageInfo: { endCursor: 'abc123', hasNextPage: true, __typename: 'PageInfo' },
            __typename: 'RepositoryConnection',
          },
          __typename: 'User'
        }
      }
    },
  }
  const setup = (mocks: Array<MockedResponse>) => {
    const Wrapper: React.FC = ({ children }) => {
      return (
        <MockedProvider mocks={mocks}>
          {children as React.ReactElement}
        </MockedProvider>
      );
    }
    return renderHook(() => useOwnReposQuery(), {
      wrapper: Wrapper,
    })
  }

  describe('useOwnReposQuery', () => {
    it('loads the initial page of repos', async () => {
      const { result, waitForNextUpdate } = setup([initialRequestMock])

      expect(result.current.loading).toBe(true)

      await waitForNextUpdate()

      expect(result.current.loading).toBe(false)
      expect(result.current.repos).toEqual(reposPageOne)
    })
  })
})
