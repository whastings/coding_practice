import React, { createContext, useContext, useEffect, useState } from 'react'
import { AsyncStorage } from 'react-native'

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

interface ProviderProps {
  onAuth: (isLoggedIn: boolean) => void,
}

export const AuthProvider: React.FC<ProviderProps> = (props) => {
  const [apiToken, setApiToken] = useState<string | null>(null)

  useEffect(() => {
    const loadApiToken = async () => {
      const token = await AsyncStorage.getItem('github-api-token')
      if (token) {
        setApiToken(token)
        props.onAuth(true)
      } else {
        props.onAuth(false)
      }
    }
    loadApiToken()
  }, [props.onAuth])

  const logIn = (token: string) => {
    AsyncStorage.setItem('github-api-token', token)
    setApiToken(token)
    props.onAuth(true)
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
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
