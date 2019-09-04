import { all, call, put, takeLatest } from 'redux-saga/effects'
import gql from 'graphql-tag'
import { createAction } from 'redux-starter-kit'
import produce from 'immer'

import { switchPage, wrapWithLoadingScreen } from '../../appRedux';
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
export const HOME_PAGE_LOAD = 'homePage/HOME_PAGE_LOAD'

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
  yield takeLatest(HOME_PAGE_LOAD, function* () {
    yield* wrapWithLoadingScreen(loadQuery, {
      queryName: 'ownRepos',
      query: OWN_REPOS_QUERY,
      variables: { first: REPOS_PER_PAGE, after: null },
    })
    yield put(switchPage('home'))
  })
}

export function* homePageSaga() {
  yield all([
    fetchMoreReposSaga(),
    loadHomeSaga(),
  ])
}
