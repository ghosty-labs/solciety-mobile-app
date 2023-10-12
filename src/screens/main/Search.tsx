import React from 'react'
import { StyledImage, StyledText, StyledView } from '../../constants/nativewind'
import Input from '../../components/Common/Input'

const SearchScreen = () => {
  return (
    <StyledView className="h-full px-4 bg-zinc-900">
      <Input />
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
