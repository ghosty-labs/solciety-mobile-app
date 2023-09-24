import React from 'react'
import { StyledView } from '../../constants/nativewind'
import NotificationItem from '../../components/Notification/NotificationItem'
import { dataNotif } from './NotifAllScreen'

const NotifMentionScreen = () => {
  const dataMentions = dataNotif.filter((notif) => notif.mention_message)

  return (
    <StyledView className="h-full pt-4 bg-zinc-900">
      {dataMentions.map((notif, index) => {
        return <NotificationItem key={index} data={notif} />
      })}
    </StyledView>
  )
}

export default NotifMentionScreen
