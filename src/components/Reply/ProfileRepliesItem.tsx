import React from 'react'
import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../constants/nativewind'
import { prettyTruncate } from '../../utils/common'
import { IReply } from '../../types/reply'
import { HomeStackParamList } from '../../types/navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
// import { IconEllipsis } from '../Icons/Icon'
import moment from 'moment'
import Avatar from '../Common/Avatar'

interface ProfileRepliesItemProps {
  repliesData: IReply
}

const ProfileRepliesItem = ({ repliesData }: ProfileRepliesItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>()

  return (
    <StyledTouchableOpacity
      className="flex flex-row items-start mb-4 border-b border-zinc-800 px-6 pb-4"
      activeOpacity={1}
      onPress={(e) => {
        e.stopPropagation()
        navigation.navigate('PostDetail', {
          type: 'post-detail',
          data: null,
          postKey: repliesData.post,
        })
      }}
    >
      <Avatar
        url={{
          uri: repliesData.image,
        }}
        size={48}
      />
      <StyledView className="w-[90%] pl-2 -mt-1">
        <StyledView className="flex flex-row justify-between items-center">
          <StyledView className="flex flex-row items-center gap-x-1">
            <StyledText className="text-base font-semibold text-white">
              {prettyTruncate(
                repliesData?.alias ? repliesData.alias : repliesData?.user,
                14,
                'address',
              )}
            </StyledText>
            <StyledImage
              className="w-4 h-4 rounded-full object-cover"
              source={require('../../assets/badges/ghosty/verified.png')}
            />
          </StyledView>
          <StyledView className="flex flex-row items-center">
            <StyledText className="text-xs text-zinc-400 mr-4">
              {moment(repliesData.created_at).fromNow()}
            </StyledText>
            {/* <IconEllipsis size={20} color="#a1a1aa" /> */}
          </StyledView>
        </StyledView>
        <StyledText className="text-sm text-zinc-400 my-1">
          Replying to{' '}
          {prettyTruncate(repliesData.post_data.user, 10, 'address')}
        </StyledText>
        <StyledView className="flex flex-row">
          <StyledText className="flex-1 text-base text-white">
            {repliesData.content}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  )
}

export default ProfileRepliesItem
