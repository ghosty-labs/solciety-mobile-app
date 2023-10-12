import React, { useState } from 'react'
import {
  StyledImage,
  StyledText,
  StyledTextInput,
  StyledView,
} from '../../constants/nativewind'

import { IconSearch } from '../../components/Icons/Icon'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SearchStackParamList } from '../../types/navigation'

const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState<string>('')

  const navigation =
    useNavigation<NativeStackNavigationProp<SearchStackParamList>>()

  const handleChangeText = async (e: string) => {
    setSearchInput(e)
  }

  return (
    <StyledView className="h-full px-4 bg-zinc-900">
      <StyledView className="flex flex-row items-center px-2 rounded-lg bg-zinc-800">
        <IconSearch size={30} color="white" />
        <StyledTextInput
          className="w-full ml-2 text-lg text-white"
          placeholder="Search"
          placeholderTextColor="#52525b"
          onChangeText={(e) => handleChangeText(e)}
          value={searchInput}
          onSubmitEditing={() => {
            navigation.navigate('SearchResults', { search: searchInput })
          }}
        />
      </StyledView>
      <StyledImage
        className="mx-auto mt-10 w-full h-80"
        source={require('../../assets/screen/search/search.png')}
      />
      <StyledText className="mt-2 text-center text-white text-3xl font-bold">
        Looking for something?
      </StyledText>
    </StyledView>
  )
}

export default SearchScreen
