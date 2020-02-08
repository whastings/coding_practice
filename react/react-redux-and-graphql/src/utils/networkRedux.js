import { createReducer } from 'redux-starter-kit'
import { call, put } from 'redux-saga/effects'

import graphqlClient from './graphqlClient'

const REQUEST_START = 'network/REQUEST_START'
const REQUEST_SUCCESS = 'network/REQUEST_SUCCESS'
const REQUEST_FAILURE = 'network/REQUEST_FAILURE'

export const networkReducer = createReducer(
  {
    requests: {},
  },
  {
    [REQUEST_START]: ({ requests }, action) => {
      requests[action.payload.requestName] = {
        loading: true,
        success: false,
        failure: false,
      }
    },
    [REQUEST_SUCCESS]: ({ requests }, action) => {
      requests[action.payload.requestName] = {
        loading: false,
        success: true,
        failure: false,
      }
    },
    [REQUEST_FAILURE]: ({ requests }, action) => {
      requests[action.payload.requestName] = {
        loading: false,
        success: false,
        failure: true,
      }
    },
  },
)

export const getRequestState = (state, requestName) => {
  return state.network.requests[requestName] || {
    loading: false,
    success: false,
    failure: false,
  }
}

function* makeRequest({ requestName, requestEffect }) {
  yield put({ type: REQUEST_START, payload: { requestName } })

  let response
  try {
    response = yield requestEffect
  } catch (error) {
    yield put({ type: REQUEST_FAILURE, payload: { requestName } })
    throw error
  }

  yield put({ type: REQUEST_SUCCESS, payload: { requestName } })

  return response
}

export function* executeMutation({ mutationName, mutation, variables }) {
  return yield* makeRequest({
    requestName: mutationName,
    requestEffect: call(graphqlClient.mutate, { mutation, variables })
  })
}

export function* loadQuery({ queryName, query, variables }) {
  return yield* makeRequest({
    requestName: queryName,
    requestEffect: call(graphqlClient.query, { queryName, query, variables })
  })
}

export function* loadMore({ queryName, variables, updateQuery }) {
  return yield* makeRequest({
    requestName: queryName,
    requestEffect: call(graphqlClient.fetchMore, { queryName, variables, updateQuery })
  })
}
