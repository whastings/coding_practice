import React, { useState, ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuthContext } from '../../utils/authContext'

const LogInPage: React.FC = () => {
  const [apiTokenValue, setApiTokenValue] = useState<string>('')
  const { logIn } = useAuthContext().actions
  const history = useHistory()

  const handleSubmit = () => {
    logIn(apiTokenValue)
    history.push('/')
  }

  const handleTokenInput = (event: ChangeEvent<HTMLInputElement>) => {
    setApiTokenValue(event.target.value)
  }

  return (
    <>
      <h1>Log In</h1>
      <label htmlFor='api-token-input'>API Token</label>
      <input id='api-token-input' onChange={handleTokenInput} value={apiTokenValue} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default LogInPage
