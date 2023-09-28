import React, { useCallback, useEffect, useState } from 'react'
import { StyledView } from '../../constants/nativewind'
import Post from '../../components/Post/Post'
import { ActivityIndicator } from 'react-native-paper'
import { PostService } from '../../services/Post'
import { useStore } from '../../providers/ContextProvider'
import { FlatList, RefreshControl } from 'react-native'
import { IPost } from '../../types/post'
import { useInfiniteQuery } from 'react-query'
import { LIMIT_SIZE_GET_POSTS } from '../../constants/variables'

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { getPosts } = PostService()
  const store = useStore()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  useEffect(() => {
    refetch()
  }, [refreshing])

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['all-posts'],
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

  return (
    <StyledView className="pt-4 h-full bg-zinc-900">
      <FlatList
        data={data?.pages.map((page) => page).flat()}
        keyExtractor={postExtractorKey}
        renderItem={(e) => renderData(e.item)}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </StyledView>
  )
}

export default HomeScreen
