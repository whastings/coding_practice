import pathToRegexp from 'path-to-regexp'

const matchActionToRoute = (action, route) => {
  const regexp = pathToRegexp(route)
  const result = regexp.exec(action.payload.location.pathname)

  if (!result) {
    return { matches: false }
  }

  return {
    matches: true,
    params: result.slice(1),
  }
}

export default matchActionToRoute
