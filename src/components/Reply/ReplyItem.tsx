import React from 'react'
import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../constants/nativewind'
import Avatar from '../Common/Avatar'
// import { IconEllipsis } from '../Icons/Icon'
import moment from 'moment'
import { prettyTruncate } from '../../utils/common'
import { IReply } from '../../types/reply'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NotifStackParamList } from '../../types/navigation'

interface ReplyItemProps {
  data: IReply
}

const ReplyItem = ({ data }: ReplyItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<NotifStackParamList>>()
  return (
    <StyledView className="flex flex-row items-start mb-4 border-b border-zinc-800 px-6 pb-4">
      {data.image && (
        <StyledTouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('ProfileDetail', { publicKey: data.user })
          }
        >
          <Avatar
            url={{
              uri: data.image,
            }}
            size={40}
          />
        </StyledTouchableOpacity>
      )}
      <StyledView className="w-[90%] pl-2 -mt-1">
        <StyledView className="flex flex-row justify-between items-center">
          <StyledView className="flex flex-row items-center gap-x-1">
            <StyledTouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('ProfileDetail', { publicKey: data.user })
              }
            >
              <StyledText className="text-base font-semibold text-white">
                {prettyTruncate(data?.alias || data.user, 10, 'address')}
              </StyledText>
            </StyledTouchableOpacity>
            {data?.is_verified && (
              <StyledImage
                className="w-4 h-4 rounded-full object-cover"
                source={require('../../assets/badges/ghosty/verified.png')}
              />
            )}
          </StyledView>
          <StyledView className="flex flex-row items-center">
            <StyledText className="text-xs text-zinc-400 mr-4">
              {moment(data.created_at).fromNow()}
            </StyledText>
            {/* <IconEllipsis size={20} color="#a1a1aa" /> */}
          </StyledView>
        </StyledView>
        <StyledView className="flex flex-row">
          <StyledText className="flex-1 text-base text-white">
            {data.content}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledView>
  )
}

export default ReplyItem
