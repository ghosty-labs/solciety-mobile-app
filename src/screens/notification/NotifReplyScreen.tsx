import React from 'react'
import { StyledView } from '../../constants/nativewind'
import NotificationItem from '../../components/Notification/NotificationItem'
import { dataNotif } from './NotifAllScreen'

const NotifReplyScreen = () => {
  const dataReplies = dataNotif.filter((notif) => notif.reply_message)

  return (
    <StyledView className="h-full pt-4 bg-zinc-900">
      {dataReplies.map((notif, index) => {
        return <NotificationItem key={index} data={notif} />
      })}
    </StyledView>
  )
}

export default NotifReplyScreen
