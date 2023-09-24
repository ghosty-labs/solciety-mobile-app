import React from 'react'
import { StyledText, StyledView } from '../../constants/nativewind'
import { dataNotif } from '../notification/NotifAllScreen'
import NotificationItem from '../../components/Notification/NotificationItem'
import { HScrollView } from 'react-native-head-tab-view'

const ProfileRepliesScreen = () => {
  const dataReplies = dataNotif.filter(
    (notif) =>
      notif.reply_message &&
      notif.user === `ANwvF5jduUnY7unZin42NxB5cz4ctFqEmcVt5nWekpFq`,
  )

  const isEmpty = dataReplies.length === 0

  return (
    <HScrollView index={1}>
      <StyledView className="h-full pt-4 bg-zinc-900">
        {!isEmpty ? (
          dataReplies.map((notif, index) => {
            return <NotificationItem key={index} data={notif} />
          })
        ) : (
          <StyledText className="mx-auto mt-40 text-base text-zinc-500">
            Nothing to see here yet.
          </StyledText>
        )}
      </StyledView>
    </HScrollView>
  )
}

export default ProfileRepliesScreen
