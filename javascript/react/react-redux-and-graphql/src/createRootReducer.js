import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { appReducer } from './appRedux'
import { networkReducer } from './utils/networkRedux'

const createRootReducer = (history) => {
  return combineReducers({
    app: appReducer,
    network: networkReducer,
    router: connectRouter(history),
  })
}

export default createRootReducer
