import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import HomePage from './sections/homePage/HomePage'
import LogInPage from './sections/logInPage/LogInPage'
import RepoPage from './sections/repoPage/RepoPage'

import { useAuthContext } from './utils/authContext'

const Router: React.FC = () => {
  const { isLoggedIn } = useAuthContext().state
  return (
    <BrowserRouter>
      {isLoggedIn && (
        <Switch>
          <Route path='/repos/:owner/:name'>
            <RepoPage />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      )}
      {!isLoggedIn && (
        <Switch>
          <Route path='/logIn'>
            <LogInPage />
          </Route>
          <Route path='/'>
            <Redirect to='/logIn' />
          </Route>
        </Switch>
      )}
    </BrowserRouter>
  )
}

export default Router
