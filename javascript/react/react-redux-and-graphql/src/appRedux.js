import { createAction, createReducer } from 'redux-starter-kit'

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
