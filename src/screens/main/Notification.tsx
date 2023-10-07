/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react'
import { StyledText, StyledView } from '../../constants/nativewind'
import { TabBar } from 'react-native-tab-view'
import { useWindowDimensions } from 'react-native'
import { INotificationTabs } from '../../types/navigation'
import NotifAllScreen from '../notification/NotifAllScreen'
import NotifReplyScreen from '../notification/NotifReplyScreen'
import NotifLikeScreen from '../notification/NotifLikeScreen'
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header'
import NotificationHeader from '../notification/NotificationHeader'
import { useFocusEffect } from '@react-navigation/native'
import { NotificationService } from '../../services/Notification'
import NotifFollowScreen from '../notification/NotificationFollowScreen'

const NotificationScreen = () => {
  const [index, setIndex] = useState<number>(0)

  const { putNotificationStatus } = NotificationService()

  useFocusEffect(
    useCallback(() => {
      const putNotifStatus = async () => {
        try {
          await putNotificationStatus()
        } catch (error) {
          console.log(error)
        }
      }

      putNotifStatus()

      return () => null
    }, []),
  )

  const layout = useWindowDimensions()
  const [routes] = useState<INotificationTabs[]>([
    {
      key: 'all',
      title: 'All',
    },
    {
      key: 'replies',
      title: 'Replies',
    },
    {
      key: 'likes',
      title: 'Likes',
    },
    {
      key: 'follow',
      title: 'Follow',
    },
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderScene = (e: any) => {
    const { route } = e

    switch (route.key) {
      case 'all':
        return <NotifAllScreen />
      case 'replies':
        return <NotifReplyScreen />
      case 'likes':
        return <NotifLikeScreen />
      case 'follow':
        return <NotifFollowScreen />
    }
  }

  return (
    <StyledView className="h-full bg-zinc-900">
      <CollapsibleHeaderTabView
        renderScrollHeader={() => <NotificationHeader />}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderLabel={(props) => {
              return (
                <StyledText
                  className={`font-semibold text-sm ${
                    props.focused ? 'text-white' : 'text-zinc-500'
                  }`}
                >
                  {props.route.title}
                </StyledText>
              )
            }}
            style={{
              backgroundColor: '#18181b',
              marginTop: -8,
              paddingVertical: 4,
            }}
            indicatorStyle={{
              backgroundColor: '#14F195',
              width: '15%',
              height: 5,
              borderRadius: 20,
              marginLeft: 20,
            }}
            android_ripple={{
              borderless: false,
              color: undefined,
            }}
          />
        )}
      />
    </StyledView>
  )
}

export default NotificationScreen
