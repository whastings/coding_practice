import { all, call, put, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router/esm/actions'
import gql from 'graphql-tag'
import { createAction } from 'redux-starter-kit'
import produce from 'immer'

import { endPageLoad, startPageLoad } from '../../appRedux';
import isActionForRoute from '../../utils/isActionForRoute'
import graphqlClient from '../../utils/graphqlClient'

const OWN_REPOS_QUERY = gql`
  query ownReposQuery($first: Int!, $after: String) { 
    viewer { 
      repositories(first: $first, after: $after) {
        edges {
          node {
            name
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
`

export const fetchMoreRepos = createAction('homePage/fetchMoreRepos')

function* fetchMoreReposSaga() {
  yield takeLatest(fetchMoreRepos, function* () {
    const currentData = yield call(graphqlClient.readQuery, 'ownRepos')
    const { endCursor } = currentData.viewer.repositories.pageInfo

    yield call(graphqlClient.fetchMore, {
      queryName: 'ownRepos',
      variables: { first: 1, after: endCursor },
      updateQuery(prevData, { fetchMoreResult }) {
        return produce(prevData, (updatedData) => {
          updatedData.viewer.repositories.edges.push(...fetchMoreResult.viewer.repositories.edges)
          updatedData.viewer.repositories.pageInfo = fetchMoreResult.viewer.repositories.pageInfo
        })
      }
    })
  })
}

function* loadHomeSaga() {
  yield takeLatest(LOCATION_CHANGE, function* (routeAction) {
    if (!isActionForRoute(routeAction, '/')) {
      return
    }

    yield put(startPageLoad())

    yield call(graphqlClient.query, {
      queryName: 'ownRepos',
      query: OWN_REPOS_QUERY,
      variables: { first: 1, after: null },
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
