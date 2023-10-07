import React from 'react'
import { StyledText, StyledView } from '../../constants/nativewind'
import { HScrollView } from 'react-native-head-tab-view'

const ProfileRepliesScreen = () => {
  return (
    <HScrollView index={1}>
      <StyledView className="h-full pt-4 bg-zinc-900">
        <StyledText className="mx-auto mt-40 text-base text-zinc-500">
          Nothing to see here yet.
        </StyledText>
      </StyledView>
    </HScrollView>
  )
}

export default ProfileRepliesScreen
