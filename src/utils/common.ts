import { APP_ENV } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PublicKey } from '@solana/web3.js'
import { Alert } from 'react-native'

export const numberFormatter = (num: number) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num
}

export const prettyTruncate = (str = '', len = 8, type?: string) => {
  if (str && str.length > len) {
    if (type === 'address') {
      if (str.length !== len + 1) {
        const front = Math.ceil(len / 2)
        const back = str.length - (len - front)
        return `${str.slice(0, front)}...${str.slice(back)}`
      }
      return str
    }
    return `${str.slice(0, len)}...`
  }
  return str
}

export const toMl = (secs: number) => {
  return parseInt(`${secs}000`)
}

export const generateRandomNumber = () => {
  const min = 1000000000000
  const max = 9999999999999
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber
}

export const getTokenUser = async () => {
  const [cachedToken] = await Promise.all([AsyncStorage.getItem('token-user')])

  return cachedToken
}

export const signWallet = (publicKey: PublicKey, nonce: string) => {
  return `Solciety wants you to sign in with your Solana account:\n${publicKey}\n\nThis request will not trigger any blockchain transaction or cost any gas fee.\nID: ${APP_ENV}\nNonce: ${nonce}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function alertLog(title: string, message: any) {
  setTimeout(async () => {
    Alert.alert(title, message, [{ text: 'Ok', style: 'cancel' }])
  }, 100)
  console.log(message)
}
