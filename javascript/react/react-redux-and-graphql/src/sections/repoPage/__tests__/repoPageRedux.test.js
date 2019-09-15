import wait from 'waait'

import createMockStore from '../../../__testUtils__/createMockStore'
import graphqlClient from '../../../utils/graphqlClient'
import { REPO_PAGE_LOAD } from '../repoPageRedux'
import { getRequestState } from '../../../utils/networkRedux'
import { getCurrentPage } from '../../../appRedux'

jest.mock('../../../utils/graphqlClient')

describe('repoPageRedux', () => {
  beforeEach(() => {
    graphqlClient.reset()
  })

  describe('loading the repo', () => {
    const createRepoData = () => {
      return {
        __typename: 'Repository',
        id: 'abc123',
        name: 'bar',
        viewerHasStarred: false,
        stargazers: {
          __typename: 'StargazerConnection',
          totalCount: 3,
        },
      }
    }

    const setup = () => {
      graphqlClient.mockSchema({
        Query: () => ({
          repository: (defaultMock, variables) => {
            if (variables.owner === 'foo' && variables.name === 'bar') {
              return createRepoData()
            }
            return null
          },
        })
      })
      const store = createMockStore()

      return { store }
    }

    it('loads the repo based on the owner name and repo name from the URL', async () => {
      const { store } = setup();
      store.dispatch({ type: REPO_PAGE_LOAD, payload: { owner: 'foo', name: 'bar' } })

      expect(getRequestState(store.getState(), 'repo').loading).toBe(true)

      await wait(1)

      expect(getRequestState(store.getState(), 'repo').loading).toBe(false)
      expect(getRequestState(store.getState(), 'repo').success).toBe(true)
      expect(graphqlClient.readQuery('repo').repository).toEqual(createRepoData())
      expect(getCurrentPage(store.getState())).toEqual('repo')
    })
  })
})
