import React from 'react'
import { StyledView } from '../../constants/nativewind'
import { IconHeart, IconReply, IconUser } from '../Icons/Icon'
import { INotificationItem } from '../../types/notification'

interface NotificationStatusProps {
  notifData: INotificationItem
}

const NotificationStatus = ({ notifData }: NotificationStatusProps) => {
  const iconStatus = () => {
    switch (notifData.type) {
      case 'COMMENT':
        return <IconReply size={12} color="white" />
      case 'LIKE':
        return <IconHeart size={12} color="white" />
      case 'FOLLOW':
        return <IconUser size={12} color="white" />
    }
  }

  const colorStatus = () => {
    switch (notifData.type) {
      case 'COMMENT':
        return 'bg-blue-500'
      case 'LIKE':
        return 'bg-pink-500'
      case 'FOLLOW':
        return 'bg-purple-700'
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
