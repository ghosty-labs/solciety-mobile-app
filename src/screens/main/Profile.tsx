/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabBar } from 'react-native-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header'
import { IProfileTabs, StackProps } from '../../types/navigation'
import ProfilePostScreen from '../profile/ProfilePost'
import ProfileRepliesScreen from '../profile/ProfileReplies'
import ProfileMediaScreen from '../profile/ProfileMedia'
import ProfileLikeScreen from '../profile/ProfileLike'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import { StyledText, StyledView } from '../../constants/nativewind'
import { ActivityIndicator } from 'react-native-paper'

const ProfileScreen = ({ navigation }: StackProps) => {
  const [index, setIndex] = useState<number>(0)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const layout = useWindowDimensions()
  const [routes] = useState<IProfileTabs[]>([
    {
      key: 'posts',
      title: 'Posts',
    },
    {
      key: 'replies',
      title: 'Replies',
    },
    {
      key: 'collectibles',
      title: 'Collectibles',
    },
    {
      key: 'likes',
      title: 'Likes',
    },
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderScene = (e: any) => {
    const { route } = e

    switch (route.key) {
      case 'posts':
        return <ProfilePostScreen isRefreshing={refreshing} />
      case 'replies':
        return <ProfileRepliesScreen />
      case 'collectibles':
        return <ProfileMediaScreen />
      case 'likes':
        return <ProfileLikeScreen />
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  return (
    <StyledView className="h-full bg-zinc-900">
      <CollapsibleHeaderTabView
        onStartRefresh={onRefresh}
        isRefreshing={refreshing}
        renderRefreshControl={() => (
          <StyledView className="mx-auto mt-6">
            <ActivityIndicator animating={true} color="white" />
          </StyledView>
        )}
        renderScrollHeader={() => (
          <ProfileHeader
            navigation={navigation}
            route={{ key: 'Setting', name: 'Setting' }}
          />
        )}
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

export default ProfileScreen
