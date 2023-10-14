/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { TabBar } from 'react-native-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header'
import { HomeStackParamList, IProfileTabs } from '../../types/navigation'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import { StyledText, StyledView } from '../../constants/nativewind'
import { ActivityIndicator } from 'react-native-paper'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useQuery } from 'react-query'
import { ProfileService } from '../../services/Profile'
import { IProfile } from '../../types/profile'
import { AxiosError } from 'axios'
import UserPostScreen from './UserPost'
import UserCollectiblesScreen from './UserCollectibles'
import UserLikeScreen from './UserLike'

const ProfileDetailScreen = () => {
  const [index, setIndex] = useState<number>(0)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const _route = useRoute<RouteProp<HomeStackParamList, 'ProfileDetail'>>()
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

  const { data: dataProfile } = useQuery({
    queryKey: 'get-user-profile',
    queryFn: () =>
      getProfile({
        public_key: _route.params.publicKey,
      }),
    onError: (error) => {
      const err = error as AxiosError
      console.log('err get-user-profile:::> ', err)
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderScene = (e: any) => {
    const { route } = e

    switch (route.key) {
      case 'posts':
        return <UserPostScreen userKey={_route.params.publicKey} />
      case 'replies':
        return <UserPostScreen userKey={_route.params.publicKey} />
      case 'collectibles':
        return <UserCollectiblesScreen userKey={_route.params.publicKey} />
      case 'likes':
        return <UserLikeScreen userKey={_route.params.publicKey} />
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

export default ProfileDetailScreen
