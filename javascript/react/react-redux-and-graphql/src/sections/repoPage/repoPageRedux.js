import { put, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router/esm/actions'
import gql from 'graphql-tag'

import { endPageLoad, startPageLoad } from '../../appRedux';
import matchActionToRoute from '../../utils/matchActionToRoute'
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

export function* loadRepoSaga() {
  yield takeLatest(LOCATION_CHANGE, function* (routeAction) {
    const routeMatch = matchActionToRoute(routeAction, '/repos/:username/:id')
    if (!routeMatch.matches) {
      return
    }
    const [username, repoName] = routeMatch.params

    yield put(startPageLoad())

    yield* loadQuery({
      queryName: 'repo',
      query: REPO_QUERY,
      variables: { owner: username, name: repoName },
    })

    yield put(endPageLoad())
  })
}
