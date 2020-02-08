import { applyMiddleware, createStore as createReduxStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../rootSaga'
import createRootReducer from '../createRootReducer'

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const rootReducer = createRootReducer()

  const store = createReduxStore(
    rootReducer,
    applyMiddleware(
      sagaMiddleware,
    ),
  )

  sagaMiddleware.run(rootSaga)

  return store
}

export default createStore
