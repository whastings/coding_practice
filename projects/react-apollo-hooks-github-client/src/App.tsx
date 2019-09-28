import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import HomePage from './sections/homePage/HomePage'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
