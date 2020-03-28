import React from 'react'
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils'
import { act, fireEvent, render } from '@testing-library/react'

import App from '../App'

describe('App', () => {
  const mockResolvers = {
    ID(context) {
      if (context.parentType === 'Repository') {
        return 'abc123'
      }
      return null
    },
    User() {
      return { login: 'will' }
    },
    PageInfo() {
      return { endCursor: 'def456', hasNextPage: true }
    },
    Repository() {
      return {
        name: 'repo-1',
        stargazers: { totalCount: 5 },
        viewerHasStarred: false,
        owner: { login: 'will' },
      }
    },
  }

  const setup = () => {
    const mockEnvironment = createMockEnvironment()

    const renderResult = render(
      <App relayEnvironment={mockEnvironment} />
    )

    const resolveQuery = () => {
      mockEnvironment.mock.resolveMostRecentOperation(operation =>
        MockPayloadGenerator.generate(operation, mockResolvers),
      )
    }

    return { ...renderResult, mockEnvironment, resolveQuery }
  }

  it('displays a list of repositories', () => {
    const { queryByText, resolveQuery } = setup()

    const loadingText = queryByText('Loading...')
    expect(loadingText).toBeTruthy()

    resolveQuery()
    expect(queryByText('Loading...')).toBeFalsy()

    const loggedInText = queryByText('Logged in as: will')
    expect(loggedInText).toBeTruthy()

    expect(queryByText(/repo-1/)).toBeTruthy()
    expect(queryByText(/Stars: 5/)).toBeTruthy()

    const starButton = queryByText('Star')
    expect(starButton).toBeTruthy()
    expect(starButton.tagName).toBe('BUTTON')
  })

  it('loads more when the load more button is clicked', () => {
    const { mockEnvironment, queryByText, resolveQuery } = setup()
    resolveQuery()

    const loadMoreButton = queryByText('Load More')
    expect(loadMoreButton).toBeTruthy()

    fireEvent.click(loadMoreButton)
    mockEnvironment.mock.resolveMostRecentOperation(operation =>
      MockPayloadGenerator.generate(operation, {
        ...mockResolvers,
        ID(context) {
          if (context.parentType === 'Repository') {
            return 'def456'
          }
          return null
        },
        PageInfo() {
          return { nextCursor: null, hasNextPage: false }
        },
        Repository() {
          return {
            ...mockResolvers.Repository(),
            name: 'repo-2',
            stargazers: { totalCount: 10 },
            viewerHasStarred: true,
          }
        },
      })
    )

    expect(queryByText(/repo-1/)).toBeTruthy()
    expect(queryByText(/repo-2/)).toBeTruthy()
    expect(queryByText(/Stars: 10/)).toBeTruthy()

    const unstarButton = queryByText('Unstar')
    expect(unstarButton).toBeTruthy()
    expect(unstarButton.tagName).toBe('BUTTON')

    expect(queryByText('Load More')).toBeFalsy()
  })

  it('allows starring and unstarring repos', () => {
    const { mockEnvironment, queryByText, resolveQuery } = setup()
    resolveQuery()

    const starButton = queryByText('Star')
    fireEvent.click(starButton)
    expect(starButton.disabled).toBe(true)
    const mutation = mockEnvironment.mock.getMostRecentOperation()
    expect(mutation.root.variables).toEqual({
      starrableId: 'abc123',
    })

    act(() => {
      mockEnvironment.mock.resolve(
        mutation,
        MockPayloadGenerator.generate(mutation, {
          ...mockResolvers,
          Repository() {
            return {
              ...mockResolvers.Repository(),
              viewerHasStarred: true,
              stargazers: { totalCount: 6 },
            }
          },
        }),
      )
    })
    expect(starButton.disabled).toBe(false)
    // TODO: Why doesn't the component tree rerender?
    // expect(queryByText('Star')).toBeFalsy()
    // expect(queryByText('Stars: 6')).toBeTruthy()
  })
})
