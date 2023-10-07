import React from 'react'
import { INotificationItem } from '../../types/notification'
import { StyledText, StyledView } from '../../constants/nativewind'

interface NotificationMessageProps {
  notifData: INotificationItem
}

const NotificationMessage = ({ notifData }: NotificationMessageProps) => {
  switch (notifData.type) {
    case 'FOLLOW':
      return (
        <StyledView>
          <StyledText className="text-zinc-500">Followed you</StyledText>
        </StyledView>
      )
    case 'COMMENT':
      return (
        <StyledView>
          <StyledText className="text-base text-zinc-400" numberOfLines={2}>
            {notifData.data?.content}
          </StyledText>
          <StyledText className="text-base text-[#14f19590]">
            {notifData.data?.tag !== '[untagged]' &&
              `#${notifData.data?.tag.replaceAll('-', ' #')}`}
          </StyledText>
          <StyledText className="flex-1 text-base text-white">
            {notifData.data?.comment}
          </StyledText>
        </StyledView>
      )
    case 'LIKE':
      return (
        <StyledView>
          <StyledText className="flex-1 text-base text-white" numberOfLines={2}>
            {notifData.data?.content}
          </StyledText>
          <StyledText className="text-base text-[#14f19590]">
            {notifData.data?.tag !== '[untagged]' &&
              `#${notifData.data?.tag.replaceAll('-', ' #')}`}
          </StyledText>
        </StyledView>
      )
  }
}

export default NotificationMessage
