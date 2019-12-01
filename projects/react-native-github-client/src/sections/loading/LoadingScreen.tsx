import React from 'react'
import { NavigationSwitchScreenComponent } from 'react-navigation'
import { ActivityIndicator } from 'react-native'

const LoadingScreen: NavigationSwitchScreenComponent = () => {
  return (
    <ActivityIndicator />
  )
}

export default LoadingScreen
