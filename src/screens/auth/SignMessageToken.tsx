import React, { useCallback, useState } from 'react'
import { useAuthorization } from '../../providers/AuthorizationProvider'
import {
  Web3MobileWallet,
  transact,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/navigation'
import { StyledImage, StyledView } from '../../constants/nativewind'
import { Button } from '../../components/Common'
import uuid from 'react-native-uuid'
import { alertLog, signWallet } from '../../utils/common'
import { PublicKey } from '@solana/web3.js'
import { toBase64 } from 'js-base64'
import { APP_ENV } from '@env'
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProfileService } from '../../services/Profile'
import nacl from 'tweetnacl'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'

type Props = NativeStackScreenProps<RootStackParamList>

const SignMessageTokenScreen = ({ navigation }: Props) => {
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false)

  const { authorizeSession, selectedAccount } = useAuthorization()
  const { getProfile, putProfile } = ProfileService()

  const fetchProfile = async () => {
    return await getProfile({ public_key: selectedAccount?.publicKey })
  }

  const { data: dataProfile } = useQuery({
    queryKey: ['get-profile-signin'],
    queryFn: fetchProfile,
    onError: (error) => {
      const err = error as AxiosError
      console.log('err get-profile-signin:::> ', err)
    },
  })

  const signMessage = useCallback(
    async (messageBuffer: Uint8Array) => {
      return await transact(async (wallet: Web3MobileWallet) => {
        const authorizationResult = await authorizeSession(wallet)

        const signedMessages = await wallet.signMessages({
          addresses: [authorizationResult.address],
          payloads: [messageBuffer],
        })

        return signedMessages[0]
      })
    },
    [authorizeSession],
  )

  const handleSignMessage = async () => {
    setIsAuthorizing(true)

    try {
      if (!selectedAccount?.publicKey) {
        alertLog('Message Error', 'Wallet not connected!')
        setIsAuthorizing(false)
        return
      }

      if (!signMessage) {
        alertLog('Message Error', 'Wallet does not support message signing!')
        setIsAuthorizing(false)
        return
      }

      const nonce = uuid.v4()
      const message = new TextEncoder().encode(
        signWallet(selectedAccount?.publicKey as PublicKey, nonce as string),
      )
      const signature = await signMessage(message)
      const isVerified = nacl.sign.detached.verify(
        message,
        signature,
        selectedAccount.publicKey.toBuffer(),
      )

      const token = toBase64(
        APP_ENV +
          '&' +
          nonce +
          '&' +
          bs58.encode(selectedAccount.publicKey.toBuffer()) +
          '&' +
          bs58.encode(signature),
      )

      if (isVerified) {
        AsyncStorage.setItem('token-user', token)

        await putProfile(
          {
            bio: dataProfile?.bio || '',
          },
          token,
          'initUser',
        )

        navigation.replace('Main')
      }
    } catch (error) {
      const err = error as AxiosError
      console.log('err put-profile-signin:::::', err.response?.data)
      alertLog('Message Error', error)
    }

    setIsAuthorizing(false)
  }

  return (
    <StyledView className="h-full bg-zinc-900">
      <StyledImage
        className="w-full h-[83%] object-top"
        source={require('../../assets/screen/connect/ghosty-solciety.png')}
      />
      <Button
        className="absolute inset-x-0 bottom-10 mx-4 py-8 shadow-2xl"
        title="Sign In"
        color="zinc"
        textColor="white"
        textSize="2xl"
        borderColor="zinc"
        radius="2xl"
        onPress={handleSignMessage}
        isDisabled={isAuthorizing}
        isLoading={isAuthorizing}
      />
    </StyledView>
  )
}

export default SignMessageTokenScreen
