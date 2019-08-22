import { delay, put, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router/esm/actions'

import { endPageLoad, startPageLoad } from '../../appRedux';
import isActionForRoute from '../../utils/isActionForRoute'

export function* loadRepoSaga() {
  yield takeLatest(LOCATION_CHANGE, function* (routeAction) {
    if (!isActionForRoute(routeAction, '/repos/:id')) {
      return
    }

    yield put(startPageLoad())

    yield delay(2000)

    yield put(endPageLoad())
  })
}
