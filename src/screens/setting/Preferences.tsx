import React from 'react'
import { useAuthorization } from '../../providers/AuthorizationProvider'
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js'
import { RootStackParamList } from '../../types/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyledView } from '../../constants/nativewind'
import { Button } from '../../components/Common'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { ProfileService } from '../../services/Profile'
import { useQuery } from 'react-query'

const PreferencesScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { deauthorizeSession, selectedAccount } = useAuthorization()
  const { getProfile } = ProfileService()

  const { data } = useQuery({
    queryKey: 'get-profile-preferances',
    queryFn: () => getProfile({ public_key: selectedAccount?.publicKey }),
  })

  const handleDisconnet = () => {
    transact(async (wallet) => {
      await deauthorizeSession(wallet)
      AsyncStorage.clear()
      navigation.replace('Splash')
    })
  }

  return (
    <StyledView className="mx-4 mt-4">
      {!data?.is_verified && (
        <Button
          className="py-5 mt-2 mb-4"
          title="Get Verified"
          color="white"
          textColor="black"
          textSize="lg"
          border={2}
          borderColor="white"
          radius="xl"
          onPress={() => navigation.navigate('MintNFT')}
        />
      )}
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
