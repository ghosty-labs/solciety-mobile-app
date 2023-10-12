import React from 'react'
import { StyledImage, StyledText, StyledView } from '../../constants/nativewind'
import Avatar from '../Common/Avatar'
import { IconEllipsis } from '../Icons/Icon'
import moment from 'moment'
import { prettyTruncate } from '../../utils/common'
import { IReply } from '../../types/reply'

interface ReplyItemProps {
  data: IReply
}

const ReplyItem = ({ data }: ReplyItemProps) => {
  return (
    <StyledView className="flex flex-row items-start mb-4 border-b border-zinc-800 px-6 pb-4">
      {data.image && (
        <Avatar
          url={{
            uri: data.image,
          }}
          size={40}
        />
      )}
      <StyledView className="w-[90%] pl-2 -mt-1">
        <StyledView className="flex flex-row justify-between items-center">
          <StyledView className="flex flex-row items-center gap-x-1">
            <StyledText className="text-base font-semibold text-white">
              {prettyTruncate(data.user, 10, 'address')}
            </StyledText>
            <StyledImage
              className="w-4 h-4 rounded-full object-cover"
              source={require('../../assets/common/verify.png')}
            />
          </StyledView>
          <StyledView className="flex flex-row items-center">
            <StyledText className="text-xs text-zinc-400 mr-4">
              {moment(data.created_at).fromNow()}
            </StyledText>
            <IconEllipsis size={20} color="#a1a1aa" />
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
