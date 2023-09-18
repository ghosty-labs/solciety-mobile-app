import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { RootStackParamList } from '../types/navigation'
import { useAuthorization } from '../providers/AuthorizationProvider'

type Props = NativeStackScreenProps<RootStackParamList>

const SplashScreen = ({ navigation }: Props) => {
  const { selectedAccount } = useAuthorization()

  useEffect(() => {
    setTimeout(() => {
      if (selectedAccount) {
        navigation.replace('Main')
      } else {
        navigation.replace('Auth')
      }
    }, 2000)
  }, [navigation])

  return (
    <View>
      <Text>Splash Screen</Text>
    </View>
  )
}

export default SplashScreen
