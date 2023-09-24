import React from 'react'
import {
  StyledSafeAreaView,
  StyledScrollView,
  StyledText,
  StyledView,
} from '../../constants/nativewind'
import Avatar from '../Common/Avatar'
import moment from 'moment'
import { prettyTruncate, toMl } from '../../utils/common'
import { INotificationItem } from '../../types/notification'
import NotificationStatus from './NotificationStatus'
import NotificationMessage from './NotificationMessage'
import NotificationAction from './NotificationAction'

interface NotificationItemProps {
  data: INotificationItem
}

const NotificationItem = ({ data }: NotificationItemProps) => {
  return (
    <StyledSafeAreaView className="mb-4 border-b border-zinc-800 pb-4">
      <StyledScrollView className="px-4">
        <StyledView className="flex flex-row items-start my-1">
          <StyledView className="relative">
            <Avatar
              url={require('../../assets/screen/connect/sample.png')}
              size={48}
            />
            <NotificationStatus data={data} />
          </StyledView>
          <StyledView className="w-[87%] pl-2 -mt-1">
            <StyledView className="flex flex-row justify-between items-center">
              <StyledView className="flex flex-row items-center gap-x-1">
                <StyledText className="text-base font-semibold text-white">
                  {prettyTruncate(data.user, 10, 'address')}
                </StyledText>
                <StyledText className="text-xs text-zinc-400">
                  {moment(toMl(data.updated_at)).fromNow()}
                </StyledText>
              </StyledView>
            </StyledView>
            <StyledView className="flex flex-row justify-between">
              <NotificationMessage data={data} />
              <NotificationAction data={data} />
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  )
}

export default NotificationItem
