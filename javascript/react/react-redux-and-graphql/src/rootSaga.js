import { all } from 'redux-saga/effects'

import { loadHomeSaga } from './sections/homePage/homePageRedux'
import { loadRepoSaga } from './sections/repoPage/repoPageRedux'

const rootSaga = function* () {
  yield all([
    loadHomeSaga(),
    loadRepoSaga(),
  ])
}

export default rootSaga
