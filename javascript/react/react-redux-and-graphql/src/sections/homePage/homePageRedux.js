import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router/esm/actions'
import gql from 'graphql-tag'

import { endPageLoad, startPageLoad } from '../../appRedux';
import isActionForRoute from '../../utils/isActionForRoute'
import graphqlClient from '../../utils/graphqlClient'

const OWN_REPOS_QUERY = gql`
  query ownReposQuery($first: Int!) { 
    viewer { 
      repositories(first: $first) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`

export function* loadHomeSaga() {
  yield takeLatest(LOCATION_CHANGE, function* (routeAction) {
    if (!isActionForRoute(routeAction, '/')) {
      return
    }

    yield put(startPageLoad())

    yield delay(2000)
    yield call(graphqlClient.query, {
      queryName: 'ownRepos',
      query: OWN_REPOS_QUERY,
      variables: { first: 1 },
    })

    yield put(endPageLoad())
  })
}
