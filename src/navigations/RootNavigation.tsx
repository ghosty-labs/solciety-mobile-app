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
import MintNFTScreen from '../screens/mint/MintNFT'
import HeaderMintNFT from '../components/Mint/HeaderMintNFT'

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
          name="PostDetail"
          component={PostDetailScreen}
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
        />
        <RootStack.Screen
          name="MintNFT"
          component={MintNFTScreen}
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
              return <HeaderMintNFT />
            },
            title: 'Get Verified',
            animationTypeForReplace: 'push',
            animation: 'slide_from_bottom',
            animationDuration: 100,
          }}
        />
        <RootStack.Screen
          name="Setting"
          component={SettingNavigation}
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation
