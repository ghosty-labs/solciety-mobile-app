import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NotifStackParamList } from '../types/navigation'
import NotificationScreen from '../screens/main/Notification'
import ProfileDetailScreen from '../screens/user/ProfileDetail'

const NotifStack = createNativeStackNavigator<NotifStackParamList>()

const NotifStackScreen = () => {
  return (
    <NotifStack.Navigator
      initialRouteName="NotifTab"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#18181b',
        },
      }}
    >
      <NotifStack.Screen name="NotifTab" component={NotificationScreen} />
      <NotifStack.Screen
        name="ProfileDetail"
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        component={ProfileDetailScreen}
      />
    </NotifStack.Navigator>
  )
}

export default NotifStackScreen
