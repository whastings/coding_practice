import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'
import { MockedProvider, MockedResponse } from '@apollo/react-testing'

import { createRepo } from './utils'
import { OwnReposQuery } from '../types/OwnReposQuery'
import { useOwnReposQuery, OWN_REPOS_QUERY } from '../homeHooks'

describe('homePageHooks', () => {
  interface OwnReposQueryMock extends MockedResponse {
    result: {
      data: OwnReposQuery,
    },
  }

  const reposPageOne = [
    createRepo({ name: 'repo1', ownerName: 'foo' }),
    createRepo({ name: 'repo2', ownerName: 'bar' }),
    createRepo({ name: 'repo3', ownerName: 'baz' }),
  ]

  const initialRequestMock: OwnReposQueryMock = {
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

  const setup = (mocks: Array<OwnReposQueryMock>) => {
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

    it('loads the next page of repos', async () => {
      const reposPageTwo = [
        createRepo({ name: 'repo4', ownerName: 'foo' }),
        createRepo({ name: 'repo5', ownerName: 'bar' }),
        createRepo({ name: 'repo6', ownerName: 'baz' }),
      ]
      const secondRequestMock: OwnReposQueryMock = {
        request: {
          query: OWN_REPOS_QUERY,
          variables: { first: 3, after: 'abc123' },
        },
        result: {
          data: {
            viewer: {
              repositories: {
                nodes: reposPageTwo,
                pageInfo: { endCursor: null, hasNextPage: false, __typename: 'PageInfo' },
                __typename: 'RepositoryConnection',
              },
              __typename: 'User'
            }
          }
        },
      }
      const { result, waitForNextUpdate } = setup([initialRequestMock, secondRequestMock])
      await waitForNextUpdate()

      expect(result.current.loadingMore).toBe(false)
      expect(result.current.hasNextPage).toBe(true)

      act(() => {
        result.current.fetchMore()
      })
      expect(result.current.loadingMore).toBe(true)

      await waitForNextUpdate()

      expect(result.current.loadingMore).toBe(false)
      expect(result.current.hasNextPage).toBe(false)
      expect(result.current.repos).toEqual(reposPageOne.concat(reposPageTwo))
    })
  })
})
