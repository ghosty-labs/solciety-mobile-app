import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/Splash'
import MainNavigation from './MainNavigation'
import AuthNavigation from './AuthNavigation'
import { RootStackParamList } from '../types/navigation'
import SettingNavigation from './SettingNavigation'
import PostDetailScreen from '../screens/post/PostDetail'
import HeaderBackPostDetail from '../components/Post/HeaderBackPostDetail'

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
        <RootStack.Screen
          name="Main"
          component={MainNavigation}
          options={{
            animationTypeForReplace: 'push',
            animation: 'fade',
          }}
        />
        <RootStack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#18181b',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerLeft: () => {
              return <HeaderBackPostDetail />
            },
            title: 'Post',
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
          name="PostDetail"
          component={PostDetailScreen}
        />
        <RootStack.Screen name="Setting" component={SettingNavigation} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation
