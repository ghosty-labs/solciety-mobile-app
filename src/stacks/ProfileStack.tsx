import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileStackParamList } from '../types/navigation'
import ProfileDetailScreen from '../screens/user/ProfileDetail'
import ProfileScreen from '../screens/main/Profile'

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>()

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileTab"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#18181b',
        },
      }}
    >
      <ProfileStack.Screen name="ProfileTab" component={ProfileScreen} />
      <ProfileStack.Screen
        name="ProfileDetail"
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        component={ProfileDetailScreen}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileStackScreen
