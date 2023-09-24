import React from 'react'
import { useState } from 'react'
import { StyledTextInput, StyledView } from '../../constants/nativewind'
import { IconSearch } from '../Icons/Icon'

const Input = () => {
  const [inputSearch, setInputSearch] = useState<string>()

  return (
    <StyledView className="flex flex-row items-center px-2 rounded-lg bg-zinc-800">
      <IconSearch size={30} color="white" />
      <StyledTextInput
        className="w-full ml-2"
        placeholder="Search"
        placeholderTextColor="#52525b"
        onChangeText={setInputSearch}
        value={inputSearch}
      />
    </StyledView>
  )
}

export default Input
