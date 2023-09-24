import React from 'react'
import { StyledImage, StyledText, StyledView } from '../../constants/nativewind'

const NotifVerifiedScreen = () => {
  return (
    <StyledView className="h-full pt-4 bg-zinc-900">
      <StyledImage
        className="w-[90%] h-40 object-cover mx-auto mt-10"
        source={require('../../assets/screen/notification/sample-verified.png')}
      />
      <StyledText className="mt-4 text-center text-3xl text-white font-bold">
        Nothing to see here yet.
      </StyledText>
    </StyledView>
  )
}

export default NotifVerifiedScreen
