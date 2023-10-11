import React from 'react'
import { StyledTouchableOpacity } from '../../constants/nativewind'
import { IconChevronLeft } from '../Icons/Icon'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../types/navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useStore } from '../../providers/ContextProvider'

const HeaderBackSetting = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Setting'>>()
  const store = useStore()

  return (
    <StyledTouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.goBack()}
    >
      <IconChevronLeft
        size={20}
        color={store?.newReply === null ? 'white' : '#71717a'}
      />
    </StyledTouchableOpacity>
  )
}

export default HeaderBackSetting
