import wait from 'waait'

import createMockStore from '../../../__testUtils__/createMockStore'
import graphqlClient from '../../../utils/graphqlClient'
import { HOME_PAGE_LOAD, OWN_REPOS_QUERY } from '../homePageRedux'
import { getRequestState } from '../../../utils/networkRedux'
import { getCurrentPage } from '../../../appRedux'

jest.mock('../../../utils/graphqlClient')

describe('homePageRedux', () => {
  const createRepoEdge = ({ name, ownerName }) => {
    return {
      node: {
        name,
        owner: {
          login: ownerName,
          __typename: 'RepositoryOwner',
        },
        __typename: 'Repository',
      },
      __typename: 'RepositoryEdge',
    }
  }

  beforeEach(() => {
    graphqlClient.reset()
  })

  describe('loading home page', () => {
    const setup = () => {
      const store = createMockStore()
      const responseData = {
        viewer: {
          repositories: {
            edges: [
              createRepoEdge({ name: 'repo1', ownerName: 'foo' }),
              createRepoEdge({ name: 'repo2', ownerName: 'bar' }),
              createRepoEdge({ name: 'repo3', ownerName: 'baz' }),
            ],
            pageInfo: { endCursor: 'abc123', hasNextPage: true, __typename: 'PageInfo' },
            __typename: 'RepositoryConnection',
          },
          __typename: 'User'
        },
      }
      graphqlClient.mockRequests([
        {
          request: {
            query: OWN_REPOS_QUERY,
            variables: { first: 3, after: null },
          },
          result: {
            data: responseData,
          },
        }
      ])

      return { store, responseData }
    }

    it('loads user repo list', async () => {
      const { store, responseData } = setup()

      store.dispatch({ type: HOME_PAGE_LOAD })

      expect(getRequestState(store.getState(), 'ownRepos').loading).toBe(true)

      await wait(1)

      expect(getRequestState(store.getState(), 'ownRepos').loading).toBe(false)
      expect(getRequestState(store.getState(), 'ownRepos').success).toBe(true)

      expect(graphqlClient.readQuery('ownRepos')).toEqual(responseData)

      expect(getCurrentPage(store.getState())).toEqual('home')
    })
  })

  describe('loading next page of repos', () => {
    // TODO
  })
})
