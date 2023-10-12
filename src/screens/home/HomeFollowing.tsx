import React from 'react'
import { StyledImage, StyledText, StyledView } from '../../constants/nativewind'

const HomeFollowingScreen = () => {
  return (
    <StyledView className="mt-20 my-auto">
      <StyledImage
        className="mx-auto mt-10 w-full h-80"
        source={require('../../assets/screen/home/home-following.png')}
      />
      <StyledText className="mt-2 text-center text-white text-3xl font-bold">
        Coming Soon
      </StyledText>
    </StyledView>
  )
}

export default HomeFollowingScreen
