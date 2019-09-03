import { all, call, put, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router/esm/actions'
import gql from 'graphql-tag'
import { createAction } from 'redux-starter-kit'
import produce from 'immer'

import { endPageLoad, startPageLoad } from '../../appRedux';
import matchActionToRoute from '../../utils/matchActionToRoute'
import graphqlClient from '../../utils/graphqlClient'
import { loadMore, loadQuery } from '../../utils/networkRedux'

const OWN_REPOS_QUERY = gql`
  query ownReposQuery($first: Int!, $after: String) { 
    viewer { 
      repositories(first: $first, after: $after) {
        edges {
          node {
            name
            owner {
              login
            }
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

const REPOS_PER_PAGE = 3

export const fetchMoreRepos = createAction('homePage/fetchMoreRepos')

function* fetchMoreReposSaga() {
  yield takeLatest(fetchMoreRepos, function* () {
    const currentData = yield call(graphqlClient.readQuery, 'ownRepos')
    const { endCursor } = currentData.viewer.repositories.pageInfo

    yield* loadMore({
      queryName: 'ownRepos',
      variables: { first: REPOS_PER_PAGE, after: endCursor },
      updateQuery(prevData, { fetchMoreResult }) {
        return produce(prevData, (updatedData) => {
          updatedData.viewer.repositories.edges.push(...fetchMoreResult.viewer.repositories.edges)
          updatedData.viewer.repositories.pageInfo = fetchMoreResult.viewer.repositories.pageInfo
        })
      },
    })
  })
}

function* loadHomeSaga() {
  yield takeLatest(LOCATION_CHANGE, function* (routeAction) {
    if (!matchActionToRoute(routeAction, '/').matches) {
      return
    }

    yield put(startPageLoad())

    yield* loadQuery({
      queryName: 'ownRepos',
      query: OWN_REPOS_QUERY,
      variables: { first: REPOS_PER_PAGE, after: null },
    })

    yield put(endPageLoad())
  })
}

export function* homePageSaga() {
  yield all([
    fetchMoreReposSaga(),
    loadHomeSaga(),
  ])
}
