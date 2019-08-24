import { all } from 'redux-saga/effects'

import { homePageSaga } from './sections/homePage/homePageRedux'
import { loadRepoSaga } from './sections/repoPage/repoPageRedux'

const rootSaga = function* () {
  yield all([
    homePageSaga(),
    loadRepoSaga(),
  ])
}

export default rootSaga
