import { createAction, createReducer } from 'redux-starter-kit'
import { all, delay, fork, join, put } from 'redux-saga/effects'

export const endPageLoad = createAction('app/endPageLoad')
export const startPageLoad = createAction('app/startPageLoad')

export const appReducer = createReducer(
  {
    isPageLoading: false,
  },
  {
    [endPageLoad]: (state) => {
      state.isPageLoading = false
    },
    [startPageLoad]: (state) => {
      state.isPageLoading = true
    }
  }
)

export function* wrapWithLoadingScreen(generatorFn, ...args) {
  const loadingTask = yield fork(generatorFn, ...args)

  yield put(startPageLoad())
  yield delay(100)

  if (loadingTask.isRunning()) {
    yield all([
      join(loadingTask),
      delay(1000),
    ])
    yield put(endPageLoad())
  } else {
    yield put(endPageLoad())
  }
}
