import React from 'react'
import { StyledText, StyledView } from '../../constants/nativewind'

const HomeHeader = () => {
  return (
    <StyledView className="w-full pt-0 px-4 mb-2 bg-zinc-900">
      <StyledView className="mx-auto">
        <StyledText className="text-lg font-bold text-white">
          Solciety
        </StyledText>
      </StyledView>
    </StyledView>
  )
}

export default HomeHeader
