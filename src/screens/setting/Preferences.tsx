import React from 'react'
import { Button, Text, View } from 'react-native'
import { useAuthorization } from '../../providers/AuthorizationProvider'
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js'
import { StackProps } from '../../types/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PreferencesScreen = ({ navigation }: StackProps) => {
  const { deauthorizeSession } = useAuthorization()

  const handleDisconnet = () => {
    transact(async (wallet) => {
      await deauthorizeSession(wallet)
      AsyncStorage.clear()
      navigation.replace('Splash')
    })
  }

  return (
    <View>
      <Text>Setting Page</Text>
      <Button title="Logout" onPress={handleDisconnet} />
    </View>
  )
}

export default PreferencesScreen
