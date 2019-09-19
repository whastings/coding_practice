import wait from 'waait'

import createMockStore from '../../../__testUtils__/createMockStore'
import graphqlClient from '../../../utils/graphqlClient'
import { toggleRepoStar, REPO_PAGE_LOAD } from '../repoPageRedux'
import { getRequestState } from '../../../utils/networkRedux'
import { getCurrentPage } from '../../../appRedux'

jest.mock('../../../utils/graphqlClient')

describe('repoPageRedux', () => {
  beforeEach(() => {
    graphqlClient.reset()
  })

  const createRepoData = (overrides = {}) => {
    return {
      __typename: 'Repository',
      id: 'abc123',
      name: 'bar',
      viewerHasStarred: false,
      stargazers: {
        __typename: 'StargazerConnection',
        totalCount: 3,
      },
      ...overrides,
    }
  }

  const setup = (repoData = createRepoData()) => {
    const addStarMock = jest.fn().mockImplementation(() => {
      return createRepoData({ viewerHasStarred: true })
    })
    const removeStarMock = jest.fn().mockImplementation(() => {
      return createRepoData({ viewerHasStarred: false })
    })
    graphqlClient.mockSchema({
      Query: () => ({
        repository: (defaultMock, variables) => {
          if (variables.owner === 'foo' && variables.name === 'bar') {
            return repoData
          }
          return null
        },
      }),
      Mutation: () => ({
        addStar: (_, args) => addStarMock(args),
        removeStar: (_, args) => removeStarMock(args),
      }),
    })
    const store = createMockStore()

    return { addStarMock, removeStarMock, store }
  }

  describe('loading the repo', () => {
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

  describe('starring the repo', () => {
    it('can add a star to the repo', async () => {
      const { addStarMock, store } = setup()
      store.dispatch({ type: REPO_PAGE_LOAD, payload: { owner: 'foo', name: 'bar' } })
      await wait(1)

      store.dispatch(toggleRepoStar())

      expect(getRequestState(store.getState(), 'toggleRepoStar').loading).toBe(true)

      await wait(1)

      expect(getRequestState(store.getState(), 'toggleRepoStar').loading).toBe(false)
      expect(getRequestState(store.getState(), 'toggleRepoStar').success).toBe(true)
      expect(addStarMock).toHaveBeenCalledWith({ input: { starrableId: 'abc123' } })
    })

    it('can remove a star from the repo', async () => {
      const { removeStarMock, store } = setup(createRepoData({ viewerHasStarred: true }))
      store.dispatch({ type: REPO_PAGE_LOAD, payload: { owner: 'foo', name: 'bar' } })
      await wait(1)

      store.dispatch(toggleRepoStar())

      expect(getRequestState(store.getState(), 'toggleRepoStar').loading).toBe(true)

      await wait(1)

      expect(getRequestState(store.getState(), 'toggleRepoStar').loading).toBe(false)
      expect(getRequestState(store.getState(), 'toggleRepoStar').success).toBe(true)
      expect(removeStarMock).toHaveBeenCalledWith({ input: { starrableId: 'abc123' } })
    })
  })
})
