import React from 'react'
import { StyledTouchableOpacity } from '../../constants/nativewind'
import { IconChevronLeft } from '../Icons/Icon'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../../types/navigation'
import { useQueryClient } from 'react-query'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useStore } from '../../providers/ContextProvider'

const HeaderBackPostDetail = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<RouteProp<RootStackParamList, 'PostDetail'>>()
  const queryClient = useQueryClient()
  const store = useStore()

  const handleQueryKey = () => {
    const type = route.params.type

    switch (type) {
      case 'post-all':
        return 'get-posts-home-all'
    }
  }

  const onClickIconBack = () => {
    if (store?.newReply === null) {
      queryClient.invalidateQueries(handleQueryKey())
      navigation.goBack()
    }
  }

  return (
    <StyledTouchableOpacity activeOpacity={0.9} onPress={onClickIconBack}>
      <IconChevronLeft
        size={20}
        color={store?.newReply === null ? 'white' : '#71717a'}
      />
    </StyledTouchableOpacity>
  )
}

export default HeaderBackPostDetail
