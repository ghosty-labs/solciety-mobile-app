import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../types/navigation'
import ConnectWalletScreen from '../screens/auth/ConnectWallet'
import SignMessageTokenScreen from '../screens/auth/SignMessageToken'
import { useAuthorization } from '../providers/AuthorizationProvider'

const AuthStack = createNativeStackNavigator<AuthStackParamList>()

const AuthNavigation = () => {
  const { selectedAccount } = useAuthorization()

  return (
    <AuthStack.Navigator
      initialRouteName={
        selectedAccount?.publicKey ? 'SignMessageToken' : 'ConnectWallet'
      }
    >
      <AuthStack.Screen
        name="ConnectWallet"
        component={ConnectWalletScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignMessageToken"
        component={SignMessageTokenScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  )
}

export default AuthNavigation
