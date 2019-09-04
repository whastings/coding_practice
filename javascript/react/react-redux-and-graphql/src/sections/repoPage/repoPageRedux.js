import { put, takeLatest } from 'redux-saga/effects'
import gql from 'graphql-tag'

import { switchPage, wrapWithLoadingScreen } from '../../appRedux';
import { loadQuery } from '../../utils/networkRedux'

const REPO_QUERY = gql`
  query repoQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      stargazers {
        totalCount
      }
    }
  }
`

export const REPO_PAGE_LOAD = 'repoPage/REPO_PAGE_LOAD'

export function* loadRepoSaga() {
  yield takeLatest(REPO_PAGE_LOAD, function* (routeAction) {
    const { owner, name } = routeAction.payload

    yield* wrapWithLoadingScreen(loadQuery, {
      queryName: 'repo',
      query: REPO_QUERY,
      variables: { owner, name },
    })

    yield put(switchPage('repo'))
  })
}
