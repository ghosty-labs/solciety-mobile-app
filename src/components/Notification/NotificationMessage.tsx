import React from 'react'
import { INotificationItem } from '../../types/notification'
import { StyledText, StyledView } from '../../constants/nativewind'

interface NotificationMessageProps {
  data: INotificationItem
}

const NotificationMessage = ({ data }: NotificationMessageProps) => {
  switch (data.notification_status) {
    case 'followed':
      return (
        <StyledView>
          <StyledText className="text-zinc-500">Followed you</StyledText>
        </StyledView>
      )
    case 'replied':
      return (
        <StyledView>
          <StyledText className="text-base text-zinc-400" numberOfLines={2}>
            {data.content}
          </StyledText>
          <StyledText className="flex-1 text-base text-white">
            {data.reply_message}
          </StyledText>
        </StyledView>
      )
    case 'mentioned':
      return (
        <StyledView>
          <StyledText className="text-zinc-500">Mentioned you</StyledText>
          <StyledText className="flex-1 text-base text-white">
            {data.mention_message}
          </StyledText>
        </StyledView>
      )
    case 'liked':
      return (
        <StyledView>
          <StyledText className="flex-1 text-base text-white">
            {data.content}
          </StyledText>
        </StyledView>
      )
  }
}

export default NotificationMessage
