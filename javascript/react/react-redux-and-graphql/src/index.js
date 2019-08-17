import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createRootReducer from './createRootReducer'
import rootSaga from './rootSaga'
import createStore from './createStore'

const history = createBrowserHistory()
const store = createStore(createRootReducer(history), rootSaga, history)

ReactDOM.render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  ),
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
