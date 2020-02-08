import React from 'react'
import { useSelector } from 'react-redux'

import './App.css'
import HomePage from './sections/homePage/HomePage'
import RepoPage from './sections/repoPage/RepoPage'
import { getCurrentPage } from './appRedux'

const ROUTE_COMPONENTS = {
  home: HomePage,
  repo: RepoPage,
}

const App = () => {
  const isPageLoading = useSelector((state) => state.app.isPageLoading)
  const currentPage = useSelector(getCurrentPage)

  if (isPageLoading || !currentPage) {
    return (
      <strong>Loading...</strong>
    )
  }

  const RouteComponent = ROUTE_COMPONENTS[currentPage]

  return (
    <RouteComponent />
  );
}

export default App
