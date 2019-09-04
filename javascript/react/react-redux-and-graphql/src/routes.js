import { HOME_PAGE_LOAD } from './sections/homePage/homePageRedux'
import { REPO_PAGE_LOAD } from './sections/repoPage/repoPageRedux'

const routeActionsMap = {
  [HOME_PAGE_LOAD]: '/',
  [REPO_PAGE_LOAD]: '/repos/:owner/:name',
}

export default routeActionsMap
