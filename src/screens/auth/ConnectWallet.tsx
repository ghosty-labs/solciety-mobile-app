import React, { useState } from 'react'
import { useAuthorization } from '../../providers/AuthorizationProvider'
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../../types/navigation'
import { StyledImage, StyledView } from '../../constants/nativewind'
import { Button } from '../../components/Common'
import { IconSolana } from '../../components/Icons/Icon'
import { alertLog } from '../../utils/common'

type Props = NativeStackScreenProps<AuthStackParamList>

const ConnectWalletScreen = ({ navigation }: Props) => {
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false)

  const { authorizeSession } = useAuthorization()

  const handleConnectWallet = async () => {
    setIsAuthorizing(true)

    try {
      await transact(async (wallet) => {
        await authorizeSession(wallet)
      })
      navigation.replace('SignMessageToken')
    } catch (error) {
      alertLog(
        'Error during connect',
        error instanceof Error ? error.message : (error as string),
      )
    }

    setIsAuthorizing(false)
  }

  return (
    <StyledView className="h-full bg-zinc-900">
      <StyledImage
        className="w-full h-[83%] object-top"
        source={require('../../assets/screen/connect/sample.png')}
      />
      <Button
        className="absolute inset-x-0 bottom-10 mx-4 py-4"
        title="Connect with Wallet"
        color="zinc"
        textColor="white"
        textSize="lg"
        border={2}
        borderColor="zinc"
        radius="2xl"
        iconSuffix={<IconSolana size={40} />}
        onPress={handleConnectWallet}
        isDisabled={isAuthorizing}
        isLoading={isAuthorizing}
      />
    </StyledView>
  )
}

export default ConnectWalletScreen
