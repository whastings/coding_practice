import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { createRepo } from '../__test_utils__'
import HomePage from '../HomePage'

const mockUseOwnReposQuery = jest.fn()
jest.mock('../homePageHooks', () => ({
  useOwnReposQuery: () => mockUseOwnReposQuery(),
}))

describe('HomePage', () => {
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
    return render(<HomePage />)
  }

  describe('when the repos query is loading', () => {
    it('displays only a loading indicator', () => {
      mockUseOwnReposQuery.mockReturnValue(queryHookResult())
      const { queryByText } = setup()

      const loadingIndicator = queryByText('Loading...')
      const reposHeading = queryByText('Your Repos')

      expect(loadingIndicator).toBeTruthy()
      expect(reposHeading).toBeNull()
    })
  })

  describe('when the repos query has loaded', () => {
    it('renders the repos list', () => {
      mockUseOwnReposQuery.mockReturnValue(queryHookResult({ loading: false }))
      const { queryByText } = setup()

      const loadingIndicator = queryByText('Loading...')
      const reposHeading = queryByText('Your Repos')
      const loadMoreButton = queryByText('Load More')

      expect(loadingIndicator).toBeNull()
      expect(reposHeading).toBeTruthy()
      expect(loadMoreButton).toBeFalsy()

      repos.forEach((repo) => {
        const repoListItem = queryByText(repo.name)
        expect(repoListItem).toBeTruthy()
      })
    })

    describe('when there is another page of repos', () => {
      it('displays a load more button to fetch the next page', () => {
        const hookResult = queryHookResult({ loading: false, hasNextPage: true })
        mockUseOwnReposQuery.mockReturnValue(hookResult)
        const { queryByText } = setup()

        const loadMoreButton = queryByText('Load More')
        expect(loadMoreButton).toBeTruthy()

        fireEvent.click(loadMoreButton!)

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
          expect(loadMoreButton).toBeDisabled()
        })
      })
    })
  })
})
