import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { RootStackParamList } from '../types/navigation'

type Props = NativeStackScreenProps<RootStackParamList>

const SplashScreen = ({ navigation }: Props) => {
  const connected = true

  useEffect(() => {
    setTimeout(() => {
      if (connected) {
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
