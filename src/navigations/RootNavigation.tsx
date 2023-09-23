import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/Splash'
import MainNavigation from './MainNavigation'
import AuthNavigation from './AuthNavigation'
import { RootStackParamList } from '../types/navigation'
import SettingNavigation from './SettingNavigation'

const RootStack = createNativeStackNavigator<RootStackParamList>()

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#18181b',
          },
        }}
      >
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen
          name="Auth"
          component={AuthNavigation}
          options={{
            animationTypeForReplace: 'push',
            animation: 'fade',
          }}
        />
        <RootStack.Screen name="Main" component={MainNavigation} />
        <RootStack.Screen name="Setting" component={SettingNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation
