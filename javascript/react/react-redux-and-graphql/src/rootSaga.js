import { all } from 'redux-saga/effects'

import { homePageSaga } from './sections/homePage/homePageRedux'
import { repoPageSaga } from './sections/repoPage/repoPageRedux'

const rootSaga = function* () {
  yield all([
    homePageSaga(),
    repoPageSaga(),
  ])
}

export default rootSaga
