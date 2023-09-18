import React, { useState } from 'react'
import { Alert, Button, Text, View } from 'react-native'
import { useAuthorization } from '../../providers/AuthorizationProvider'
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/navigation'

type Props = NativeStackScreenProps<RootStackParamList>

const ConnectWalletScreen = ({ navigation }: Props) => {
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false)

  const { authorizeSession } = useAuthorization()

  const handleConnectWallet = async () => {
    setIsAuthorizing(true)

    try {
      await transact(async (wallet) => {
        await authorizeSession(wallet)
      })
      navigation.replace('Main')
    } catch (error) {
      setTimeout(async () => {
        Alert.alert(
          'Error during connect',
          error instanceof Error ? error.message : (error as string),
          [{ text: 'Ok', style: 'cancel' }],
        )
      }, 100)

      console.log(error)
    }

    setIsAuthorizing(false)
  }

  return (
    <View>
      <Text>Auth Address</Text>
      <Button
        title="Connect Wallet"
        disabled={isAuthorizing}
        onPress={handleConnectWallet}
      />
    </View>
  )
}

export default ConnectWalletScreen
