import React, { useEffect } from 'react'
import { IPost } from '../../types/post'
import Post from '../../components/Post/Post'
import { PostService } from '../../services/Post'
import { useInfiniteQuery } from 'react-query'
import { LIMIT_SIZE_GET_POSTS } from '../../constants/variables'
import { ActivityIndicator } from 'react-native-paper'
import { HFlatList } from 'react-native-head-tab-view'
import { useAuthorization } from '../../providers/AuthorizationProvider'
import { useStore } from '../../providers/ContextProvider'
import { useRNPaper } from '../../providers/RNPaperProvider'

interface ProfilePostScreenProps {
  isRefreshing: boolean
}

const ProfilePostScreen = ({ isRefreshing }: ProfilePostScreenProps) => {
  const { selectedAccount } = useAuthorization()
  const { getPosts } = PostService()
  const store = useStore()
  const paper = useRNPaper()

  useEffect(() => {
    if (isRefreshing) {
      refetch()
    }
  }, [isRefreshing])

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [`profile-post-${selectedAccount?.publicKey}`],
      queryFn: ({ pageParam = 1 }) =>
        getPosts({
          __skip: (pageParam - 1) * LIMIT_SIZE_GET_POSTS,
          __limit: LIMIT_SIZE_GET_POSTS,
          user: selectedAccount?.publicKey,
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

  return (
    <HFlatList
      index={0}
      keyExtractor={postExtractorKey}
      data={data?.pages.map((page) => page).flat()}
      renderItem={(e) => renderData(e.item)}
      onEndReached={loadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
      style={{ marginTop: 16 }}
    />
  )
}

export default ProfilePostScreen
