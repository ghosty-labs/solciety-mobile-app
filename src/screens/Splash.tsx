import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { RootStackParamList } from '../types/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = NativeStackScreenProps<RootStackParamList>

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    ;(async () => {
      const cachedBase64Address = await Promise.resolve(
        AsyncStorage.getItem('base64Address'),
      )

      setTimeout(() => {
        if (cachedBase64Address) {
          navigation.replace('Main')
        } else {
          navigation.replace('Auth')
        }
      }, 1000)
    })()
  }, [navigation])

  return (
    <View>
      <Text>Splash Screen</Text>
    </View>
  )
}

export default SplashScreen
