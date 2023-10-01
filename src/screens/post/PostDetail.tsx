import React, { useEffect, useRef } from 'react'
import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../constants/nativewind'
import { RootStackParamList } from '../../types/navigation'
import { RouteProp } from '@react-navigation/native'
import Post from '../../components/Post/Post'
import ReplyItem from '../../components/Reply/ReplyItem'
import { useInfiniteQuery } from 'react-query'
import { ReplyService } from '../../services/Reply'
import Avatar from '../../components/Common/Avatar'
import { prettyTruncate } from '../../utils/common'
import { useBottomDrawer } from '../../providers/BottomDrawerProvider'
import { useStore } from '../../providers/ContextProvider'
import { IReply } from '../../types/reply'
import { LIMIT_SIZE_GET_COMMENT } from '../../constants/variables'
import { FlatList } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useRNPaper } from '../../providers/RNPaperProvider'

interface PostDetailScreenProps {
  // navigation: NativeStackNavigationProp<RootStackParamList, 'PostDetail'>
  route: RouteProp<RootStackParamList, 'PostDetail'>
}

const PostDetailScreen = ({ route }: PostDetailScreenProps) => {
  const { getReplies } = ReplyService()
  const listRef = useRef<FlatList>(null)
  const setter = useBottomDrawer()
  const paper = useRNPaper()
  const store = useStore()
  const data = route.params.data

  const {
    isLoading,
    data: repliesData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`get-comment`],
    queryFn: ({ pageParam = 1 }) =>
      getReplies({
        post: data.key,
        __skip: (pageParam - 1) * LIMIT_SIZE_GET_COMMENT,
        __limit: LIMIT_SIZE_GET_COMMENT,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 0 ? undefined : allPages.length + 1,
  })

  useEffect(() => {
    if (store?.newReply !== null) {
      setTimeout(() => {
        repliesData?.pages[0].unshift(store?.newReply as IReply)
        store?.setNewReply(null)
        paper?.setShowPortal(null)
      }, 6000)
    }
  }, [store?.newReply])

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const renderSpinner = () => {
    return <ActivityIndicator animating={true} color="#3f3f46" />
  }

  const replyExtractorKey = (_: IReply, index: number) => {
    return index.toString()
  }

  const renderData = (reply: IReply) => {
    return <ReplyItem data={reply} />
  }

  const accountPost = () => {
    if (data?.alias) {
      return data.alias
    }
    return data?.user
  }

  const onClickReply = () => {
    if (store?.newReply === null) {
      setter?.setReplyData?.(data)
      setter?.setShowDrawer('reply')
    }
  }

  return (
    <StyledView className="relative h-full">
      <StyledView className="h-[92%]">
        <FlatList
          ref={listRef}
          keyExtractor={replyExtractorKey}
          data={
            isLoading ? null : repliesData?.pages.map((page) => page).flat()
          }
          renderItem={(e) => renderData(e.item)}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListHeaderComponent={<Post type="post-detail" data={data} />}
          ListEmptyComponent={
            isLoading ? (
              <StyledView className="my-auto">
                <ActivityIndicator animating={true} size={30} color="#3f3f46" />
              </StyledView>
            ) : null
          }
          ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
          style={{ marginTop: 16, paddingTop: 10 }}
        />
      </StyledView>
      <StyledTouchableOpacity
        className="absolute bottom-0 w-full h-16 border-t border-zinc-800 bg-zinc-900"
        activeOpacity={0.8}
        onPress={onClickReply}
      >
        <StyledView className="w-full mt-2 px-4">
          <StyledView className="flex flex-row items-center px-2 py-2.5 rounded-full bg-zinc-800">
            <Avatar
              url={require('../../assets/screen/connect/sample.png')}
              size={30}
            />
            <StyledText className="ml-2 text-zinc-500">
              Reply to {prettyTruncate(accountPost(), 18, 'address')}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledTouchableOpacity>
    </StyledView>
  )
}

export default PostDetailScreen
