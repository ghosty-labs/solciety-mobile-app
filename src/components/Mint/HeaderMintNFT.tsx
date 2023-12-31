import React from 'react'
import { StyledTouchableOpacity } from '../../constants/nativewind'
import { IconChevronLeft } from '../Icons/Icon'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../types/navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useStore } from '../../providers/ContextProvider'

const HeaderMintNFT = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const store = useStore()

  return (
    <StyledTouchableOpacity
      activeOpacity={0.9}
      onPress={() => (store?.isMinting ? null : navigation.goBack())}
    >
      <IconChevronLeft
        size={20}
        color={store?.newReply === null ? 'white' : '#71717a'}
      />
    </StyledTouchableOpacity>
  )
}

export default HeaderMintNFT
