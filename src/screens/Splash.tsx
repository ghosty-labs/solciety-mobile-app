import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { RootStackParamList } from '../types/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IconSolanaText } from '../components/Icons/Icon'
import { StyledView } from '../constants/nativewind'

type Props = NativeStackScreenProps<RootStackParamList>

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    ;(async () => {
      const [cachedBase64Address, cachedTokenUser] = await Promise.all([
        AsyncStorage.getItem('base64Address'),
        AsyncStorage.getItem('token-user'),
      ])

      setTimeout(() => {
        if (cachedBase64Address && cachedTokenUser) {
          navigation.replace('Main')
        } else {
          navigation.replace('Auth')
        }
      }, 1000)
    })()
  }, [navigation])

  return (
    <StyledView className="m-auto">
      <IconSolanaText size={200} />
    </StyledView>
  )
}

export default SplashScreen
