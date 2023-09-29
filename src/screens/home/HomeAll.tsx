import React, { useEffect, useRef, useState } from 'react'
import { IPost } from '../../types/post'
import Post from '../../components/Post/Post'
import { PostService } from '../../services/Post'
import { useInfiniteQuery, useQuery } from 'react-query'
import { LIMIT_SIZE_GET_POSTS } from '../../constants/variables'
import { ActivityIndicator } from 'react-native-paper'
import { HFlatList } from 'react-native-head-tab-view'
import { useAuthorization } from '../../providers/AuthorizationProvider'
import { useStore } from '../../providers/ContextProvider'
import { useRNPaper } from '../../providers/RNPaperProvider'
import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../constants/nativewind'
import { FlatList } from 'react-native'
import { IconArrowUp } from '../../components/Icons/Icon'
import { PublicKey } from '@solana/web3.js'

interface HomeAllScreenProps {
  isRefreshing: boolean
}

const HomeAllScreen = ({ isRefreshing }: HomeAllScreenProps) => {
  const [isNewPost, setIsNowPost] = useState<boolean>(false)
  const { selectedAccount } = useAuthorization()
  const { getPosts, getPostStatus, putPostStatus } = PostService()
  const store = useStore()
  const paper = useRNPaper()
  const listRef = useRef<FlatList>(null)

  useEffect(() => {
    if (isRefreshing) {
      refetch()
      putPostStatus()
      setIsNowPost(false)
    }
  }, [isRefreshing])

  const { data: newPostStatus } = useQuery({
    queryKey: ['get-profile-status'],
    queryFn: () =>
      getPostStatus({ public_key: selectedAccount?.publicKey as PublicKey }),
    refetchInterval: 10000,
  })

  useEffect(() => {
    if (newPostStatus?.has_new_post) {
      setIsNowPost(true)
    }
  }, [newPostStatus?.has_new_post])

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [`get-posts-home-all`],
      queryFn: ({ pageParam = 1 }) =>
        getPosts({
          __skip: (pageParam - 1) * LIMIT_SIZE_GET_POSTS,
          __limit: LIMIT_SIZE_GET_POSTS,
        }),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 0 ? undefined : allPages.length + 1,
    })

  useEffect(() => {
    if (store?.newPost !== null) {
      setTimeout(() => {
        data?.pages[0].unshift(store?.newPost as IPost)
        store?.setNewPost(null)
        paper?.setShowPortal(null)
      }, 4000)
    }
  }, [store?.newPost])

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const renderSpinner = () => {
    return <ActivityIndicator animating={true} color="#3f3f46" />
  }

  const postExtractorKey = (_: IPost, index: number) => {
    return index.toString()
  }

  const renderData = (post: IPost) => {
    return <Post data={post} />
  }

  const onClickNewPost = () => {
    putPostStatus()
    refetch()
    setIsNowPost(false)
    listRef.current?.scrollToOffset({ offset: 0, animated: true })
  }

  return (
    <>
      <HFlatList
        index={0}
        ref={listRef}
        keyExtractor={postExtractorKey}
        data={data?.pages.map((page) => page).flat()}
        renderItem={(e) => renderData(e.item)}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
        style={{ marginTop: 16 }}
      />

      {isNewPost && (
        <StyledView className="absolute top-14 w-full">
          <StyledTouchableOpacity
            className="flex flex-row items-center gap-x-1 mx-auto p-3 rounded-full bg-zinc-700 shadow-2xl"
            activeOpacity={0.9}
            onPress={onClickNewPost}
          >
            <IconArrowUp size={16} color="white" />
            <StyledText className="text-white">New Post</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      )}
    </>
  )
}

export default HomeAllScreen
