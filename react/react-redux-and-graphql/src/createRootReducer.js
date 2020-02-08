import { combineReducers } from 'redux'

import { appReducer } from './appRedux'
import { networkReducer } from './utils/networkRedux'

const createRootReducer = (additionalReducers = {}) => {
  return combineReducers({
    app: appReducer,
    network: networkReducer,
    ...additionalReducers,
  })
}

export default createRootReducer
