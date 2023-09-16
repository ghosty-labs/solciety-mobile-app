import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { IProfileTabs } from '../types/navigation'
import { SceneMap, TabView } from 'react-native-tab-view'
import ProfilePostScreen from './Profile/ProfilePost'
import ProfileRepliesScreen from './Profile/ProfileReplies'
import ProfileMediaScreen from './Profile/ProfileMedia'
import ProfileLikeScreen from './Profile/ProfileLike'

const renderScene = SceneMap<IProfileTabs>({
  posts: ProfilePostScreen,
  replies: ProfileRepliesScreen,
  media: ProfileMediaScreen,
  likes: ProfileLikeScreen,
})

const ProfileScreen = () => {
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
      key: 'media',
      title: 'Media',
    },
    {
      key: 'likes',
      title: 'Likes',
    },
  ])

  return (
    <TabView
      style={{ width: '100%' }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition="top"
    />
  )
}

export default ProfileScreen
