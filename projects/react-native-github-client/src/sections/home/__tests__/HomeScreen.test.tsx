import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { NavigationStackScreenProps } from 'react-navigation-stack'

import { createRepo } from './utils'
import HomeScreen from '../HomeScreen'

const mockUseOwnReposQuery = jest.fn()
jest.mock('../homeHooks', () => ({
  useOwnReposQuery: () => mockUseOwnReposQuery(),
}))

describe('HomeScreen', () => {
  const repos = [
    createRepo({ name: 'repo1', ownerName: 'foo' }),
    createRepo({ name: 'repo2', ownerName: 'bar' }),
    createRepo({ name: 'repo3', ownerName: 'baz' }),
  ]
  const queryHookResult = (overrides = {}) => {
    return {
      fetchMore: jest.fn(),
      hasNextPage: false,
      loading: true,
      loadingMore: false,
      repos,
      ...overrides,
    }
  }
  const setup = () => {
    const mockProps = {
      navigation: {
        navigate: jest.fn(),
      },
    } as unknown as NavigationStackScreenProps

    const renderResult = render(<HomeScreen {...mockProps} />)

    return { ...renderResult, mockProps }
  }

  describe('when the repos query is loading', () => {
    it('displays only a loading indicator', () => {
      mockUseOwnReposQuery.mockReturnValue(queryHookResult())
      const { queryByText } = setup()

      const loadingIndicator = queryByText('Loading...')

      expect(loadingIndicator).toBeTruthy()
    })
  })

  describe('when the repos query has loaded', () => {
    it('renders the repos list', () => {
      mockUseOwnReposQuery.mockReturnValue(queryHookResult({ loading: false }))
      const { queryByText } = setup()

      const loadingIndicator = queryByText('Loading...')
      const loadMoreButton = queryByText('Load More')

      expect(loadingIndicator).toBeNull()
      expect(loadMoreButton).toBeFalsy()

      repos.forEach((repo) => {
        const repoListItem = queryByText(repo.name)
        expect(repoListItem).toBeTruthy()
      })
    })

    it('navigates to the Repo screen when one is tapped', () => {
      mockUseOwnReposQuery.mockReturnValue(queryHookResult({ loading: false }))
      const { mockProps, queryByText } = setup()

      const repoListItem = queryByText('repo2')
      fireEvent.press(repoListItem!)

      expect(mockProps.navigation.navigate).toHaveBeenCalledWith({
        routeName: 'Repo',
        params: {
          repoName: 'repo2',
          ownerName: 'bar',
        },
      })
    })

    describe('when there is another page of repos', () => {
      it('displays a load more button to fetch the next page', () => {
        const hookResult = queryHookResult({ loading: false, hasNextPage: true })
        mockUseOwnReposQuery.mockReturnValue(hookResult)
        const { queryByText } = setup()

        const loadMoreButton = queryByText('Load More')
        expect(loadMoreButton).toBeTruthy()

        fireEvent.press(loadMoreButton!)

        expect(hookResult.fetchMore).toHaveBeenCalledTimes(1)
      })

      describe('when the next page is loading', () => {
        it('keeps rendering previous repos and disables the Load More button', () => {
          const hookResult = queryHookResult({ loading: false, hasNextPage: true, loadingMore: true })
          mockUseOwnReposQuery.mockReturnValue(hookResult)
          const { getByText, queryByText } = setup()

          repos.forEach((repo) => {
            const repoListItem = queryByText(repo.name)
            expect(repoListItem).toBeTruthy()
          })

          const loadMoreButton = getByText('Load More')
          expect(loadMoreButton.props.disabled).toBe(true)
        })
      })
    })
  })
})
