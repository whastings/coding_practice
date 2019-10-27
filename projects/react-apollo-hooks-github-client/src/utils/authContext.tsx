import React, { createContext, useContext, useState } from 'react'

interface AuthContextValue {
  state: {
    apiToken: string | null,
    isLoggedIn: boolean,
  },
  actions: {
    logIn: (token: string) => void,
  },
}

const AuthContext = createContext<AuthContextValue>({
  state: {
    apiToken: null,
    isLoggedIn: false,
  },
  actions: {
    logIn: (token) => {},
  },
})

const existingToken = localStorage.getItem('github-api-token') || null

export const AuthProvider: React.FC = ({ children }) => {
  const [apiToken, setApiToken] = useState<string | null>(existingToken)

  const logIn = (token: string) => {
    localStorage.setItem('github-api-token', token)
    setApiToken(token)
  }

  const state = {
    apiToken,
    isLoggedIn: !!apiToken,
  }
  const actions = {
    logIn,
  }

  return (
    <AuthContext.Provider value={{ state, actions }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
