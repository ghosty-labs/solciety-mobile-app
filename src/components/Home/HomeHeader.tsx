import React from 'react'
import { StyledImage, StyledView } from '../../constants/nativewind'

const HomeHeader = () => {
  return (
    <StyledView className="w-full pt-0 px-4 -mb-2 bg-zinc-900">
      <StyledView className="mx-auto">
        <StyledImage
          className="w-28 h-20"
          source={require('../../assets/logo/solciety.png')}
        />
      </StyledView>
    </StyledView>
  )
}

export default HomeHeader
