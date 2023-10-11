import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PreferencesScreen from '../screens/setting/Preferences'
import HeaderBackSetting from '../components/Setting/HeaderBackSetting'

const SettingStack = createNativeStackNavigator()

const SettingNavigation = () => {
  return (
    <SettingStack.Navigator
      initialRouteName="Preferences"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#18181b',
        },
      }}
    >
      <SettingStack.Screen
        name="Preferences"
        component={PreferencesScreen}
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
            return <HeaderBackSetting />
          },
          title: 'Preferences',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
    </SettingStack.Navigator>
  )
}

export default SettingNavigation
