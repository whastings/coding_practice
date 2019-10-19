import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { createRepo } from './utils'
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

      expect(loadingIndicator).toBeNull()
      expect(reposHeading).toBeTruthy()

      repos.forEach((repo) => {
        const repoListItem = queryByText(repo.name)
        expect(repoListItem).toBeTruthy()
      })
    })
  })
})
