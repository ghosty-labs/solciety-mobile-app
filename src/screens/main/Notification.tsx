/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { StyledText, StyledView } from '../../constants/nativewind'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import { useWindowDimensions } from 'react-native'
import { INotificationTabs } from '../../types/navigation'
import NotifAllScreen from '../notification/NotifAllScreen'
import NotifReplyScreen from '../notification/NotifReplyScreen'
import NotifMentionScreen from '../notification/NotifMentionScreen'
import NotifVerifiedScreen from '../notification/NotifVerifiedScreen'

const renderScene = SceneMap<INotificationTabs>({
  all: NotifAllScreen,
  replies: NotifReplyScreen,
  mention: NotifMentionScreen,
  verified: NotifVerifiedScreen,
})

const NotificationScreen = () => {
  const [index, setIndex] = useState<number>(0)

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
      key: 'mention',
      title: 'Mentions',
    },
    {
      key: 'verified',
      title: 'Verified',
    },
  ])

  return (
    <StyledView className="h-full bg-zinc-900">
      <TabView
        style={{ width: '100%' }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        tabBarPosition="top"
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderLabel={(props) => {
              return (
                <StyledText
                  className={`font-semibold text-base ${
                    props.focused ? 'text-white' : 'text-zinc-500'
                  }`}
                >
                  {props.route.title}
                </StyledText>
              )
            }}
            style={{ backgroundColor: '#18181b' }}
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
