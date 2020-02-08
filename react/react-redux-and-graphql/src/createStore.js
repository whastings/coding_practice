import { applyMiddleware, createStore as createReduxStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { connectRoutes } from 'redux-first-router'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootSaga from './rootSaga'
import routeActionsMap from './routes'
import createRootReducer from './createRootReducer'

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const routingConnector = connectRoutes(routeActionsMap)
  const rootReducer = createRootReducer({ location: routingConnector.reducer })

  const store = createReduxStore(
    rootReducer,
    composeWithDevTools(
      routingConnector.enhancer,
      applyMiddleware(
        routingConnector.middleware,
        sagaMiddleware,
      ),
    ),
  )

  sagaMiddleware.run(rootSaga)
  routingConnector.initialDispatch()

  return store
}

export default createStore
