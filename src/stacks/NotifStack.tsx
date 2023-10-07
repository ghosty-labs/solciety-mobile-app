import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NotifStackParamList } from '../types/navigation'
import NotificationScreen from '../screens/main/Notification'
import ProfileDetailScreen from '../screens/user/ProfileDetail'

const HomeStack = createNativeStackNavigator<NotifStackParamList>()

const NotifStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="NotifTab"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#18181b',
        },
      }}
    >
      <HomeStack.Screen name="NotifTab" component={NotificationScreen} />
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

export default NotifStackScreen
