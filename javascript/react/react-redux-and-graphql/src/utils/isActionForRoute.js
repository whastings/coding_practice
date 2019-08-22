import pathToRegexp from 'path-to-regexp'

const isActionForRoute = (action, route) => {
  const regexp = pathToRegexp(route)
  return regexp.test(action.payload.location.pathname)
}

export default isActionForRoute
