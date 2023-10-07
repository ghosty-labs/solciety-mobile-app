import React from 'react'
import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../constants/nativewind'
import Avatar from '../Common/Avatar'
import moment from 'moment'
import { prettyTruncate } from '../../utils/common'
import { INotificationItem } from '../../types/notification'
import NotificationStatus from './NotificationStatus'
import NotificationMessage from './NotificationMessage'
import NotificationAction from './NotificationAction'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../../types/navigation'

interface NotificationItemProps {
  notifData: INotificationItem
}

const NotificationItem = ({ notifData }: NotificationItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>()

  return (
    <StyledView className="mb-4 border-b border-zinc-800 pb-4">
      <StyledTouchableOpacity
        className="px-4"
        activeOpacity={1}
        onPress={(e) => {
          e.stopPropagation()
          if (notifData.type !== 'FOLLOW') {
            navigation.navigate('PostDetail', {
              type: 'post-detail',
              data: null,
              postKey: notifData.data.post,
            })
          }
        }}
      >
        <StyledView className="flex flex-row items-start my-1">
          <StyledTouchableOpacity
            className="relative"
            activeOpacity={1}
            onPress={() =>
              navigation.navigate('ProfileDetail', {
                publicKey: notifData.from,
              })
            }
          >
            <Avatar
              url={{
                uri: notifData.icon,
              }}
              size={48}
            />
            <NotificationStatus notifData={notifData} />
          </StyledTouchableOpacity>
          <StyledView className="w-[87%] pl-2 -mt-1">
            <StyledView className="flex flex-row justify-between items-center">
              <StyledView className="flex flex-row items-center gap-x-2">
                <StyledTouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    navigation.navigate('ProfileDetail', {
                      publicKey: notifData.from,
                    })
                  }
                >
                  <StyledText className="text-base font-semibold text-white">
                    {prettyTruncate(notifData.from, 10, 'address')}
                  </StyledText>
                </StyledTouchableOpacity>
                <StyledText className="text-xs text-zinc-400">
                  {moment(notifData.updated_at).fromNow()}
                </StyledText>
              </StyledView>
            </StyledView>
            <StyledView className="flex flex-row justify-between">
              <NotificationMessage notifData={notifData} />
              <NotificationAction notifData={notifData} />
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledTouchableOpacity>
    </StyledView>
  )
}

export default NotificationItem
