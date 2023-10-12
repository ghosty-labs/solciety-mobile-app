import React from 'react'
import { useAuthorization } from '../../providers/AuthorizationProvider'
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js'
import { RootStackParamList } from '../../types/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyledView } from '../../constants/nativewind'
import { Button } from '../../components/Common'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

const PreferencesScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { deauthorizeSession } = useAuthorization()

  const handleDisconnet = () => {
    transact(async (wallet) => {
      await deauthorizeSession(wallet)
      AsyncStorage.clear()
      navigation.replace('Splash')
    })
  }

  return (
    <StyledView className="mx-4 mt-4">
      <Button
        className="py-5 mt-2"
        title="Logout"
        textColor="red"
        textSize="lg"
        border={2}
        borderColor="red"
        radius="xl"
        onPress={handleDisconnet}
      />
    </StyledView>
  )
}

export default PreferencesScreen
