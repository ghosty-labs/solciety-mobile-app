/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabBar } from 'react-native-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header'
import { IProfileTabs } from '../../types/navigation'
import ProfilePostScreen from '../profile/ProfilePost'
import ProfileRepliesScreen from '../profile/ProfileReplies'
import ProfileMediaScreen from '../profile/ProfileMedia'
import ProfileLikeScreen from '../profile/ProfileLike'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import { StyledText, StyledView } from '../../constants/nativewind'
import { ActivityIndicator } from 'react-native-paper'
import { ProfileService } from '../../services/Profile'
import { useQuery } from 'react-query'
import { useAuthorization } from '../../providers/AuthorizationProvider'
import { IProfile } from '../../types/profile'
import { useFocusEffect } from '@react-navigation/native'

const ProfileScreen = () => {
  const [index, setIndex] = useState<number>(0)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { selectedAccount } = useAuthorization()
  const { getProfile } = ProfileService()
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

  useFocusEffect(
    useCallback(() => {
      refetch()

      return () => null
    }, []),
  )

  const { data: dataProfile, refetch } = useQuery({
    queryKey: 'get-currentuser-profile',
    queryFn: () =>
      getProfile({
        public_key: selectedAccount?.publicKey,
      }),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderScene = (e: any) => {
    const { route } = e

    switch (route.key) {
      case 'posts':
        return (
          <ProfilePostScreen
            isRefreshing={refreshing}
            userKey={selectedAccount?.publicKey.toString() as string}
          />
        )
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
          <ProfileHeader dataProfile={dataProfile as IProfile} />
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
