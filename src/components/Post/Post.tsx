import React, { useEffect, useState } from 'react'
import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../constants/nativewind'
import Avatar from '../Common/Avatar'
import { IconComment, IconEllipsis, IconHeart, IconShare } from '../Icons/Icon'
import moment from 'moment'
import { numberFormatter, prettyTruncate } from '../../utils/common'
import { IPost, TPostItem } from '../../types/post'
import { RootStackParamList } from '../../types/navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { useStore } from '../../providers/ContextProvider'

interface PostProps {
  type: TPostItem
  data: IPost
}

const Post = ({ type, data }: PostProps) => {
  const [totalReply, setTotalReply] = useState<number>(0)

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'PostDetail'>>()
  const store = useStore()
  const liked = data.liked?.filter(
    (address) => address === 'ANwvF5jduUnY7unZin42NxB5cz4ctFqEmcVt5nWekpFq',
  )

  useEffect(() => {
    if (store?.newReply !== null) {
      setTimeout(() => {
        setTotalReply(totalReply + 1)
      }, 6000)
    }
  }, [store?.newReply])

  const handleTotalReply = () => {
    if (type === 'post-detail') {
      return numberFormatter((data?.total_comment || 0) + totalReply)
    }

    return numberFormatter(data?.total_comment || 0)
  }

  return (
    <StyledTouchableOpacity
      className="flex flex-row items-start mb-4 border-b border-zinc-800 px-4 pb-4"
      activeOpacity={1}
      onPress={(e) => {
        e.stopPropagation()
        navigation.navigate('PostDetail', { type, data })
      }}
    >
      <Avatar
        url={require('../../assets/screen/connect/sample.png')}
        size={48}
      />
      <StyledView className="w-[87%] pl-2 -mt-1">
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
        <StyledText className="text-base text-solana-green">
          {data.tag !== '[untagged]' && `#${data.tag.replaceAll('-', ' #')}`}
        </StyledText>
        <StyledView className="flex flex-row justify-between mt-2">
          <StyledView className="flex flex-row item-center">
            <IconComment size={20} color="#a1a1aa" />
            <StyledText className="font-semibold text-zinc-500 ml-1">
              {handleTotalReply()}
            </StyledText>
          </StyledView>
          <StyledView className="flex flex-row item-center">
            <IconHeart
              size={20}
              color={
                liked?.length === 0 || liked !== undefined
                  ? '#ec4899'
                  : '#a1a1aa'
              }
            />
            <StyledText className="font-semibold text-zinc-500 ml-1">
              {numberFormatter(data?.likes || 0)}
            </StyledText>
          </StyledView>
          <IconShare size={20} color="#a1a1aa" />
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  )
}

export default Post
