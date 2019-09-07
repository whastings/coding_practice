import { all, call, put, takeLatest } from 'redux-saga/effects'
import { createAction } from 'redux-starter-kit'
import gql from 'graphql-tag'

import graphqlClient from '../../utils/graphqlClient'
import { switchPage, wrapWithLoadingScreen } from '../../appRedux';
import { executeMutation, loadQuery } from '../../utils/networkRedux'

const STARRED_REPO = gql`
  fragment StarredRepo on Repository {
    viewerHasStarred
    stargazers {
      totalCount
    }
  }
`

const REPO_QUERY = gql`
  query repoQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      ...StarredRepo
    }
  }

  ${STARRED_REPO}
`

const ADD_STAR_MUTATION = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        ...StarredRepo
      }
    }
  }

  ${STARRED_REPO}
`

const REMOVE_STAR_MUTATION = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        ...StarredRepo
      }
    }
  }

  ${STARRED_REPO}
`

export const REPO_PAGE_LOAD = 'repoPage/REPO_PAGE_LOAD'

export const toggleRepoStar = createAction('repoPage/TOGGLE_REPO_STAR')

function* toggleRepoStarSaga() {
  yield takeLatest(toggleRepoStar, function* () {
    const { repository } = yield call(graphqlClient.readQuery, 'repo')
    const mutation = repository.viewerHasStarred ? REMOVE_STAR_MUTATION : ADD_STAR_MUTATION

    yield* executeMutation({
      mutationName: 'toggleRepoStar',
      mutation,
      variables: { id: repository.id },
    })
  })
}

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

export function* repoPageSaga() {
  yield all([
    loadRepoSaga(),
    toggleRepoStarSaga(),
  ])
}
