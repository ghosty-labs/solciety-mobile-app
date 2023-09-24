/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { SceneMap, TabBar } from 'react-native-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header'
import { IProfileTabs, StackProps } from '../../types/navigation'
import ProfilePostScreen from '../profile/ProfilePost'
import ProfileRepliesScreen from '../profile/ProfileReplies'
import ProfileMediaScreen from '../profile/ProfileMedia'
import ProfileLikeScreen from '../profile/ProfileLike'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import { StyledText, StyledView } from '../../constants/nativewind'

const ProfileScreen = ({ navigation }: StackProps) => {
  const [index, setIndex] = useState<number>(0)

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

  const renderScene = SceneMap<IProfileTabs>({
    posts: ProfilePostScreen,
    replies: ProfileRepliesScreen,
    collectibles: ProfileMediaScreen,
    likes: ProfileLikeScreen,
  })

  return (
    <StyledView className="h-full bg-zinc-900">
      <CollapsibleHeaderTabView
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
