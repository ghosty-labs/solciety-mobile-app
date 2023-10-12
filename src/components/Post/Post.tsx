import React, { useEffect, useState } from 'react'
import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../constants/nativewind'
import Avatar from '../Common/Avatar'
import { IconComment, IconHeart, IconShare } from '../Icons/Icon'
import moment from 'moment'
import { alertLog, numberFormatter, prettyTruncate } from '../../utils/common'
import { IPost, TPostItem } from '../../types/post'
import { HomeStackParamList } from '../../types/navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { useStore } from '../../providers/ContextProvider'
import { PostService } from '../../services/Post'

interface PostProps {
  type: TPostItem
  data: IPost
}

const Post = ({ type, data }: PostProps) => {
  const [totalReply, setTotalReply] = useState<number>(0)
  const [totalLikes, setTotalLikes] = useState<number>(0)
  const [isLiked, setIsLiked] = useState<boolean>()

  const { putLikePost, putUnlikePost } = PostService()
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>()
  const store = useStore()

  useEffect(() => {
    setTotalLikes(data?.total_like || 0)

    if (data?.likes) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [data])

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

  const onPressLikePost = async () => {
    try {
      if (isLiked) {
        await putUnlikePost({ post: data?.key })
        setIsLiked(false)
        setTotalLikes(totalLikes - 1)
      } else {
        await putLikePost({ post: data?.key })
        setIsLiked(true)
        setTotalLikes(totalLikes + 1)
      }
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : error
      alertLog('Error Message', errMsg)
    }
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
      <StyledTouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.navigate('ProfileDetail', { publicKey: data?.user })
        }
      >
        {data?.image && (
          <Avatar
            url={{
              uri: data.image,
            }}
            size={48}
          />
        )}
      </StyledTouchableOpacity>
      <StyledView className="w-[87%] pl-2 -mt-1">
        <StyledView className="flex flex-row justify-between items-center">
          <StyledView className="flex flex-row items-center gap-x-1">
            <StyledTouchableOpacity
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('ProfileDetail', { publicKey: data?.user })
              }
            >
              <StyledText className="text-base font-semibold text-white">
                {prettyTruncate(
                  data?.alias ? data.alias : data?.user,
                  10,
                  'address',
                )}
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
              {moment(data?.created_at).fromNow()}
            </StyledText>
            {/* <IconEllipsis size={20} color="#a1a1aa" /> */}
          </StyledView>
        </StyledView>
        <StyledView className="flex flex-row">
          <StyledText className="flex-1 text-base text-white">
            {data?.content}
          </StyledText>
        </StyledView>
        <StyledText className="text-base text-solana-green">
          {data?.tag !== '[untagged]' && `#${data?.tag?.replaceAll('-', ' #')}`}
        </StyledText>
        <StyledView className="flex flex-row justify-between mt-2">
          <StyledView className="flex flex-row item-center">
            <IconComment size={20} color="#a1a1aa" />
            <StyledText className="font-semibold text-zinc-500 ml-1">
              {handleTotalReply()}
            </StyledText>
          </StyledView>
          <StyledTouchableOpacity
            className="flex flex-row item-center"
            activeOpacity={0.8}
            onPress={onPressLikePost}
          >
            <IconHeart
              size={20}
              color={isLiked ? '#be185d' : '#a1a1aa'}
              fill={isLiked ? '#be185d' : 'none'}
            />
            <StyledText className="font-semibold text-zinc-500 ml-1">
              {totalLikes}
            </StyledText>
          </StyledTouchableOpacity>
          <IconShare size={20} color="#a1a1aa" />
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  )
}

export default Post
