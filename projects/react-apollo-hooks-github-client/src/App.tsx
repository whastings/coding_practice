import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import HomePage from './sections/homePage/HomePage'
import RepoPage from './sections/repoPage/RepoPage'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/repos/:owner/:name'>
          <RepoPage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
