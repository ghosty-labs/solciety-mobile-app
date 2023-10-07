import React from 'react'
import { StyledText, StyledView } from '../../constants/nativewind'

const NotificationHeader = () => {
  return (
    <StyledView className="w-full pt-0 px-4 mt-2 mb-2 bg-zinc-900">
      <StyledText className="text-3xl font-bold text-white">
        Notifications
      </StyledText>
    </StyledView>
  )
}

export default NotificationHeader
