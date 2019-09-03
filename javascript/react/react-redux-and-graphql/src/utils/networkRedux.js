import { createReducer } from 'redux-starter-kit'
import { call, put } from 'redux-saga/effects'

import graphqlClient from './graphqlClient'

const LOAD_QUERY_START = 'network/LOAD_QUERY_START'
const LOAD_QUERY_SUCCESS = 'network/LOAD_QUERY_SUCCESS'
const LOAD_QUERY_FAILURE = 'network/LOAD_QUERY_FAILURE'

export const networkReducer = createReducer(
  {
    requests: {},
  },
  {
    [LOAD_QUERY_START]: ({ requests }, action) => {
      requests[action.payload.queryName] = {
        loading: true,
        success: false,
        failure: false,
      }
    },
    [LOAD_QUERY_SUCCESS]: ({ requests }, action) => {
      requests[action.payload.queryName] = {
        loading: false,
        success: true,
        failure: false,
      }
    },
    [LOAD_QUERY_FAILURE]: ({ requests }, action) => {
      requests[action.payload.queryName] = {
        loading: false,
        success: false,
        failure: true,
      }
    },
  },
)

export function* loadQuery({ queryName, query, variables }) {
  yield put({ type: LOAD_QUERY_START, payload: { queryName, variables } })

  let response
  try {
    response = yield call(graphqlClient.query, { queryName, query, variables })
  } catch (error) {
    yield put({ type: LOAD_QUERY_FAILURE, payload: { queryName, variables } })
    throw error
  }

  yield put({ type: LOAD_QUERY_SUCCESS, payload: { queryName, variables } })

  return response
}

export function* loadMore({ queryName, variables, updateQuery }) {
  yield put({ type: LOAD_QUERY_START, payload: { queryName, variables } })

  let response
  try {
    response = yield call(graphqlClient.fetchMore, { queryName, variables, updateQuery })
  } catch (error) {
    yield put({ type: LOAD_QUERY_FAILURE, payload: { queryName, variables } })
    throw error
  }

  yield put({ type: LOAD_QUERY_SUCCESS, payload: { queryName, variables } })

  return response
}
