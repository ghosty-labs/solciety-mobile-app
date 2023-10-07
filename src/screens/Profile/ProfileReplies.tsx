import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { LIMIT_SIZE_GET_POSTS } from '../../constants/variables'
import { ActivityIndicator } from 'react-native-paper'
import { HFlatList } from 'react-native-head-tab-view'
import { StyledText, StyledView } from '../../constants/nativewind'
import { FlatList } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { ReplyService } from '../../services/Reply'
import { IReply } from '../../types/reply'
import ProfileRepliesItem from '../../components/Reply/ProfileRepliesItem'
import { useAuthorization } from '../../providers/AuthorizationProvider'

const ProfileRepliesScreen = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { selectedAccount } = useAuthorization()
  const { getReplies } = ReplyService()
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
      queryKey: [`profile-replies`],
      queryFn: ({ pageParam = 1 }) =>
        getReplies({
          __skip: (pageParam - 1) * LIMIT_SIZE_GET_POSTS,
          __limit: LIMIT_SIZE_GET_POSTS,
          __lookup_post: true,
          user: selectedAccount?.publicKey,
        }),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 0 ? undefined : allPages.length + 1,
    })

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const renderSpinner = () => {
    return <ActivityIndicator animating={true} color="#3f3f46" />
  }

  const postExtractorKey = (_: IReply, index: number) => {
    return index.toString()
  }

  const renderData = (reply: IReply) => {
    return <ProfileRepliesItem repliesData={reply} />
  }

  const renderEmpty = () => {
    return (
      <StyledText className="mx-auto mt-40 text-base text-zinc-500">
        Nothing to see here yet.
      </StyledText>
    )
  }

  return (
    <>
      <HFlatList
        index={1}
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
    </>
  )
}

export default ProfileRepliesScreen
