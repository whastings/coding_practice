import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { appReducer } from './appRedux'

const createRootReducer = (history) => {
  return combineReducers({
    app: appReducer,
    router: connectRouter(history),
  })
}

export default createRootReducer
