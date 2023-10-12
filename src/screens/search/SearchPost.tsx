import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IPost } from '../../types/post'
import Post from '../../components/Post/Post'
import { PostService } from '../../services/Post'
import { useInfiniteQuery } from 'react-query'
import { LIMIT_SIZE_GET_POSTS } from '../../constants/variables'
import { ActivityIndicator } from 'react-native-paper'
import { HFlatList } from 'react-native-head-tab-view'
import { useStore } from '../../providers/ContextProvider'
import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../constants/nativewind'
import { FlatList } from 'react-native'
import { IconArrowUp } from '../../components/Icons/Icon'
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native'
import { SearchStackParamList } from '../../types/navigation'

const SearchPostScreen = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [isNewPost, setIsNowPost] = useState<boolean>(false)

  const { getPosts, putPostStatus } = PostService()
  const route = useRoute<RouteProp<SearchStackParamList, 'SearchResults'>>()
  const store = useStore()
  const listRef = useRef<FlatList>(null)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (refreshing) {
      refetch()
      putPostStatus()
      setIsNowPost(false)
    }
  }, [refreshing])

  useFocusEffect(
    useCallback(() => {
      refetch()

      return () => null
    }, []),
  )

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [`get-posts-home-all`],
      queryFn: ({ pageParam = 1 }) =>
        getPosts({
          __skip: (pageParam - 1) * LIMIT_SIZE_GET_POSTS,
          __limit: LIMIT_SIZE_GET_POSTS,
          search: route.params.search,
        }),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 0 ? undefined : allPages.length + 1,
    })

  useEffect(() => {
    if (store?.newPost !== null) {
      setTimeout(() => {
        data?.pages[0].unshift(store?.newPost as IPost)
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
    return <Post type="post-all" data={post} />
  }

  const onClickNewPost = () => {
    putPostStatus()
    refetch()
    setIsNowPost(false)
    listRef.current?.scrollToOffset({ offset: 0, animated: true })
  }

  const renderEmpty = () => {
    return (
      <StyledText className="mx-auto mt-40 text-base text-zinc-500">
        The data you are looking for does not exist.
      </StyledText>
    )
  }

  return (
    <>
      <HFlatList
        index={0}
        ref={listRef}
        onStartRefresh={onRefresh}
        isRefreshing={refreshing}
        renderRefreshControl={() => (
          <StyledView className="mx-auto mt-10">
            <ActivityIndicator animating={true} color="white" />
          </StyledView>
        )}
        keyExtractor={postExtractorKey}
        data={data?.pages.map((page) => page).flat()}
        renderItem={(e) => renderData(e.item)}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListEmptyComponent={() => data?.pages[0].length === 0 && renderEmpty()}
        ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
        style={{ marginTop: 16 }}
      />
      {isNewPost && (
        <StyledView className="absolute top-12 w-full z-50 shadow-2xl">
          <StyledView className="w-0.5 h-full mx-auto bg-solana-green" />
          <StyledView className="mx-auto rounded-full bg-zinc-900">
            <StyledTouchableOpacity
              className="flex flex-row items-center gap-x-1 mx-auto p-3 rounded-full bg-solana-green shadow-2xl"
              activeOpacity={0.8}
              onPress={onClickNewPost}
            >
              <IconArrowUp size={16} color="black" />
              <StyledText className="font-semibold text-black">
                New Post
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      )}
    </>
  )
}

export default SearchPostScreen
