import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import SplashScreen from '../screens/Splash'
import MainNavigation from './MainNavigation'
import AuthNavigation from './AuthNavigation'
import { RootStackParamList } from '../types/navigation'

const RootStack = createNativeStackNavigator<RootStackParamList>()

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="Auth" component={AuthNavigation} />
        <RootStack.Screen name="Main" component={MainNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation
