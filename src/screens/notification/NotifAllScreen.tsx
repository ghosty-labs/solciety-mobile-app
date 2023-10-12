import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyledText, StyledView } from '../../constants/nativewind'
import NotificationItem from '../../components/Notification/NotificationItem'
import { INotificationItem } from '../../types/notification'
import { NotificationService } from '../../services/Notification'
import { useInfiniteQuery } from 'react-query'
import { LIMIT_SIZE_GET_NOTIFICATION } from '../../constants/variables'
import { ActivityIndicator } from 'react-native-paper'
import { HFlatList } from 'react-native-head-tab-view'
import { FlatList } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useStore } from '../../providers/ContextProvider'
import { AxiosError } from 'axios'

const NotifAllScreen = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { getNotification, putNotificationStatus } = NotificationService()
  const listRef = useRef<FlatList>(null)
  const store = useStore()

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
      if (store?.newNotif) {
        refetch()
        setTimeout(() => {
          putNotifStatus()
        }, 2000)
      }

      return () => null
    }, [store?.newNotif]),
  )

  const putNotifStatus = async () => {
    try {
      await putNotificationStatus()
      store?.setNewNotif(null)
    } catch (error) {
      console.log(error)
    }
  }

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [`get-notif-all`],
      queryFn: ({ pageParam = 1 }) =>
        getNotification({
          __skip: (pageParam - 1) * LIMIT_SIZE_GET_NOTIFICATION,
          __limit: LIMIT_SIZE_GET_NOTIFICATION,
        }),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 0 ? undefined : allPages.length + 1,
      onError: (error) => {
        const err = error as AxiosError
        console.log('err get-notif-all::> ', err.response?.data)
      },
    })

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const renderSpinner = () => {
    return <ActivityIndicator animating={true} color="#3f3f46" />
  }

  const postExtractorKey = (_: INotificationItem, index: number) => {
    return index.toString()
  }

  const renderData = (notif: INotificationItem) => {
    return <NotificationItem notifData={notif} />
  }

  const renderEmpty = () => {
    return (
      <StyledText className="mx-auto mt-40 text-base text-zinc-500">
        Nothing to see here yet.
      </StyledText>
    )
  }

  return (
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
      ListHeaderComponent={() => null}
      ListEmptyComponent={() => data?.pages[0].length === 0 && renderEmpty()}
      ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
      style={{ marginTop: 16 }}
    />
  )
}

export default NotifAllScreen
