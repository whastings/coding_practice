import { createAction, createReducer } from 'redux-starter-kit'
import { all, delay, fork, join, put } from 'redux-saga/effects'

export const endPageLoad = createAction('app/endPageLoad')
export const startPageLoad = createAction('app/startPageLoad')
export const switchPage = createAction('app/switchPage')

export const appReducer = createReducer(
  {
    currentPage: null,
    isPageLoading: false,
  },
  {
    [endPageLoad]: (state) => {
      state.isPageLoading = false
    },
    [startPageLoad]: (state) => {
      state.isPageLoading = true
    },
    [switchPage]: (state, action) => {
      state.currentPage = action.payload
    }
  }
)

export const getCurrentPage = (state) => state.app.currentPage

export function* wrapWithLoadingScreen(generatorFn, ...args) {
  const loadingTask = yield fork(generatorFn, ...args)

  yield delay(100)

  if (loadingTask.isRunning()) {
    yield put(startPageLoad())
    yield all([
      join(loadingTask),
      delay(1000),
    ])
    yield put(endPageLoad())
  }
}
