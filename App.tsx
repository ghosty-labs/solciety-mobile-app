import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootTabNavigator from './src/navigations/RootTabNavigator'

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <RootTabNavigator />
    </NavigationContainer>
  )
}

export default App
