import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../types/navigation'
import ProfileDetailScreen from '../screens/user/ProfileDetail'
import HomeScreen from '../screens/main/Home'

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#18181b',
        },
      }}
    >
      <HomeStack.Screen name="HomeTab" component={HomeScreen} />
      <HomeStack.Screen
        name="ProfileDetail"
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        component={ProfileDetailScreen}
      />
    </HomeStack.Navigator>
  )
}

export default HomeStackScreen
