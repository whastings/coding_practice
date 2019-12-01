import React, { useState } from 'react'
import { NavigationSwitchScreenComponent, SafeAreaView } from 'react-navigation'
import { Button, Text, TextInput } from 'react-native'

import { useAuthContext } from '../../utils/authContext'

const LoginScreen: NavigationSwitchScreenComponent = (props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const { logIn } = useAuthContext().actions

  const handleSubmit = () => {
    logIn(inputValue)
  }

  return (
    <SafeAreaView>
      <Text>Log In</Text>
      <TextInput onChangeText={setInputValue} />
      <Button onPress={handleSubmit} title='Go'>Go</Button>
    </SafeAreaView>
  )
}

export default LoginScreen
