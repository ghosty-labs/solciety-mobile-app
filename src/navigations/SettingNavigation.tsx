import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PreferencesScreen from '../screens/setting/Preferences'

const SettingStack = createNativeStackNavigator()

const SettingNavigation = () => {
  return (
    <SettingStack.Navigator initialRouteName="Preferences">
      <SettingStack.Screen name="Preferences" component={PreferencesScreen} />
    </SettingStack.Navigator>
  )
}

export default SettingNavigation
