import { applyMiddleware, createStore as createReduxStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

const createStore = (rootReducer, rootSaga, history) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createReduxStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
      ),
    ),
  )

  sagaMiddleware.run(rootSaga)
  return store
}

export default createStore
