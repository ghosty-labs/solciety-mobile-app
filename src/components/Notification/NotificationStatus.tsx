import React from 'react'
import { StyledView } from '../../constants/nativewind'
import { IconAt, IconHeart, IconReply, IconUser } from '../Icons/Icon'
import { INotificationItem } from '../../types/notification'

interface NotificationStatusProps {
  data: INotificationItem
}

const NotificationStatus = ({ data }: NotificationStatusProps) => {
  const iconStatus = () => {
    switch (data.notification_status) {
      case 'followed':
        return <IconUser size={12} color="white" />
      case 'replied':
        return <IconReply size={12} color="white" />
      case 'mentioned':
        return <IconAt size={12} color="white" />
      case 'liked':
        return <IconHeart size={12} color="white" />
    }
  }

  const colorStatus = () => {
    switch (data.notification_status) {
      case 'followed':
        return 'bg-purple-700'
      case 'replied':
        return 'bg-blue-500'
      case 'mentioned':
        return 'bg-green-600'
      case 'liked':
        return 'bg-pink-500'
    }
  }

  return (
    <StyledView
      className={`absolute -right-1 -bottom-1 border-2 border-zinc-900 flex flex-row justify-center items-center w-6 h-6 rounded-full ${colorStatus()}`}
    >
      {iconStatus()}
    </StyledView>
  )
}

export default NotificationStatus
