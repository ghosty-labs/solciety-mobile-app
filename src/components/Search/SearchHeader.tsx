import React from 'react'
import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../constants/nativewind'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  HomeStackParamList,
  SearchStackParamList,
} from '../../types/navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const SearchHeader = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>()
  const route = useRoute<RouteProp<SearchStackParamList, 'SearchResults'>>()

  return (
    <StyledView className="w-full px-4 mb-2 bg-zinc-900">
      <StyledTouchableOpacity
        activeOpacity={0.9}
        className="flex flex-row items-center px-2 rounded-lg bg-zinc-800"
        onPress={() => navigation.goBack()}
      >
        <StyledText className="w-full py-2.5 ml-2 text-lg text-white">{`Search: ${route.params.search}`}</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  )
}

export default SearchHeader
