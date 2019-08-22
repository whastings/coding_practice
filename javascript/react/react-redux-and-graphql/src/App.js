import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './App.css'
import HomePage from './sections/homePage/HomePage'
import RepoPage from './sections/repoPage/RepoPage'

const App = () => {
  const isPageLoading = useSelector((state) => state.app.isPageLoading)

  if (isPageLoading) {
    return (
      <strong>Loading...</strong>
    )
  }

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/repos/:id" component={RepoPage} />
    </Switch>
  );
}

export default App
