import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../types/navigation'
import ConnectWalletScreen from '../screens/auth/ConnectWallet'

const AuthStack = createNativeStackNavigator<AuthStackParamList>()

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="ConnectWallet"
        component={ConnectWalletScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  )
}

export default AuthNavigation
